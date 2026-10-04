import React, { useState } from 'react'
import { Check, ChevronRight, CreditCard, LockKeyhole, Mail, MapPin, Package, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import products from '../data/products'
import { generateWhatsAppUrl, orderWhatsAppMessage } from '../utils/whatsapp'
import { FREE_DELIVERY_THRESHOLD, getDeliveryCharge } from '../utils/shipping'

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
    Cashfree?: (options: { mode: 'sandbox' | 'production' }) => {
      checkout: (options: { paymentSessionId: string; redirectTarget: '_modal' }) => Promise<{ error?: { message?: string } }>
    }
    Paytm?: {
      CheckoutJS: {
        init: (config: Record<string, unknown>) => Promise<void>
        invoke: () => void
      }
    }
  }
}

function generateOrderId() {
  return 'ARH-' + Math.random().toString(36).substr(2, 6).toUpperCase()
}

export default function Checkout() {
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())
  const deliveryCharge = getDeliveryCharge(total)
  const orderTotal = total + deliveryCharge
  const clear = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pin: '' })
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cashfree' | 'paytm'>('razorpay')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))

  const placeOrder = async (payment: { id: string; orderId: string; method: string }) => {
    const orderId = generateOrderId()
    const orderItems = items.map((item) => ({
      productName: products.find((product) => product.id === item.productId)?.name || item.productId,
      quantity: item.quantity,
      weightGrams: item.weightGrams,
    }))
    const whatsappUrl = generateWhatsAppUrl(orderWhatsAppMessage(orderId, form, orderItems, orderTotal, deliveryCharge, payment.method, payment.id))
    const order = { id: orderId, items, subtotal: total, deliveryCharge, total: orderTotal, customer: form, payment: payment.method, transactionId: payment.id, gatewayOrderId: payment.orderId, whatsappUrl }
    localStorage.setItem('last_order', JSON.stringify(order))
    clear()
    navigate('/order-success')
  }

  const loadScript = async (src: string, name: 'Cashfree' | 'Paytm') => {
    if (window[name]) return
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Unable to load ${name} checkout`))
      document.body.appendChild(script)
    })
  }

  const customerPayload = { name: form.name, phone: form.phone, email: form.email }

  const startPayment = async () => {
    if (!form.name || !form.phone || !form.address || !form.pin) {
      alert('Please fill all required fields')
      return
    }
    setPaymentError('')
    setPaymentLoading(true)
    try {
      if (paymentMethod === 'razorpay') {
        if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Unable to load Razorpay checkout'))
          document.body.appendChild(script)
        })
        }
        const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderTotal * 100 }),
        })
        const createdOrder = await response.json()
        if (!response.ok) throw new Error(createdOrder.error || 'Unable to start payment')
        await new Promise<void>((resolve, reject) => {
          const Razorpay = window.Razorpay
          if (!Razorpay) return reject(new Error('Razorpay checkout is unavailable'))
          const razorpay = new Razorpay({
            key: createdOrder.keyId,
            amount: createdOrder.amount,
            currency: createdOrder.currency,
            name: 'Arhaya Products',
            description: 'Botanical essentials',
            order_id: createdOrder.id,
            prefill: { name: form.name, email: form.email, contact: form.phone },
            theme: { color: '#075c3d' },
            handler: async (payment: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
              const verification = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, razorpaySignature: payment.razorpay_signature }),
              })
              const result = await verification.json()
              if (!verification.ok || !result.verified) return reject(new Error(result.error || 'Payment verification failed'))
              await placeOrder({ id: payment.razorpay_payment_id, orderId: payment.razorpay_order_id, method: 'razorpay' })
              resolve()
            },
            modal: { ondismiss: () => reject(new Error('Payment was cancelled')) },
          })
          razorpay.open()
        })
      } else if (paymentMethod === 'cashfree') {
        const response = await fetch('/api/create-cashfree-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderTotal * 100, customer: customerPayload }),
        })
        const createdOrder = await response.json()
        if (!response.ok) throw new Error(createdOrder.error || 'Unable to start payment')
        await loadScript('https://sdk.cashfree.com/js/v3/cashfree.js', 'Cashfree')
        if (!window.Cashfree) throw new Error('Cashfree checkout is unavailable')
        const cashfree = window.Cashfree({ mode: createdOrder.mode || 'sandbox' })
        const result = await cashfree.checkout({ paymentSessionId: createdOrder.paymentSessionId, redirectTarget: '_modal' })
        if (result.error) throw new Error(result.error.message || 'Payment was cancelled')
        const verification = await fetch('/api/verify-cashfree-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: createdOrder.orderId }),
        })
        const verified = await verification.json()
        if (!verification.ok || !verified.verified) throw new Error(verified.error || 'Payment verification failed')
        await placeOrder({ id: verified.transactionId, orderId: createdOrder.orderId, method: 'cashfree' })
      } else {
        const response = await fetch('/api/create-paytm-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: orderTotal * 100, customer: customerPayload }),
        })
        const createdOrder = await response.json()
        if (!response.ok) throw new Error(createdOrder.error || 'Unable to start payment')
        const paytmHost = createdOrder.environment === 'production' ? 'securegw.paytm.in' : 'securegw-stage.paytm.in'
        await loadScript(`https://${paytmHost}/merchantpgpui/checkoutjs/merchants/${createdOrder.mid}.js`, 'Paytm')
        if (!window.Paytm) throw new Error('Paytm checkout is unavailable')
        await new Promise<void>((resolve, reject) => {
          const checkout = window.Paytm?.CheckoutJS
          if (!checkout) return reject(new Error('Paytm checkout is unavailable'))
          checkout.init({
            root: '',
            flow: 'DEFAULT',
            data: { orderId: createdOrder.orderId, token: createdOrder.txnToken, tokenType: 'TXN_TOKEN', amount: String(orderTotal) },
            merchant: { mid: createdOrder.mid, name: 'Arhaya Products' },
            handler: {
              notifyMerchant: (eventName: string, data: { STATUS?: string; RESPMSG?: string }) => {
                if (eventName === 'APP_CLOSED') reject(new Error('Payment was cancelled'))
                if (eventName === 'SESSION_EXPIRED') reject(new Error('Payment session expired'))
                if (eventName === 'TRANSACTION_STATUS' && data.STATUS === 'TXN_SUCCESS') resolve()
                if (eventName === 'TRANSACTION_STATUS' && data.STATUS && data.STATUS !== 'TXN_SUCCESS') reject(new Error(data.RESPMSG || 'Payment failed'))
              },
            },
          }).then(() => checkout.invoke()).catch(reject)
        })
        const verification = await fetch('/api/verify-paytm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: createdOrder.orderId }),
        })
        const verified = await verification.json()
        if (!verification.ok || !verified.verified) throw new Error(verified.error || 'Payment verification failed')
        await placeOrder({ id: verified.transactionId, orderId: createdOrder.orderId, method: 'paytm' })
      }
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'Payment could not be completed')
    } finally {
      setPaymentLoading(false)
    }
  }

  if (items.length === 0) return <div className="container mx-auto py-20 text-center"><h1 className="text-2xl font-black text-[#15251d]">Your cart is empty.</h1></div>

  return (
    <div className="container mx-auto py-8 sm:py-12">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a675a]">Almost there</p><h1 className="mt-1 text-4xl font-black tracking-tight text-[#15251d]">Checkout</h1></div>
        <div className="hidden items-center gap-2 text-sm font-semibold text-[#214a35] sm:flex"><LockKeyhole size={17} /> Secure checkout</div>
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#eadcc5] bg-[#f8f4e8] px-5 py-4 sm:px-10">
        {['Information', 'Shipping', 'Payment'].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2 text-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075c3d] text-sm font-bold text-white">{index + 1}</span><span className="hidden text-sm font-semibold text-[#214a35] sm:inline">{step}</span></div>
            {index < 2 && <div className="h-px flex-1 bg-[#cdbfa8] mx-3 sm:mx-6" />}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_340px]">
        <form onSubmit={(event) => { event.preventDefault(); void startPayment() }} className="space-y-4">
          <section className="rounded-2xl border border-[#eadcc5] bg-white/80 p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-bold text-[#15251d]"><Mail size={20} className="text-[#214a35]" /> Contact information</h2>
            <input type="email" placeholder="Email address" value={form.email} onChange={(event) => updateField('email', event.target.value)} className="checkout-input mt-4" />
          </section>

          <section className="rounded-2xl border border-[#eadcc5] bg-white/80 p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-bold text-[#15251d]"><MapPin size={20} className="text-[#214a35]" /> Shipping address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Full name *" value={form.name} onChange={(event) => updateField('name', event.target.value)} className="checkout-input sm:col-span-2" />
              <input required type="tel" inputMode="tel" placeholder="Phone number *" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className="checkout-input sm:col-span-2" />
              <input required placeholder="Address *" value={form.address} onChange={(event) => updateField('address', event.target.value)} className="checkout-input sm:col-span-2" />
              <input placeholder="State" value={form.state} onChange={(event) => updateField('state', event.target.value)} className="checkout-input" />
              <input placeholder="City" value={form.city} onChange={(event) => updateField('city', event.target.value)} className="checkout-input" />
              <input required inputMode="numeric" placeholder="Pincode *" value={form.pin} onChange={(event) => updateField('pin', event.target.value)} className="checkout-input sm:col-span-2" />
            </div>
          </section>

          <section className="rounded-2xl border border-[#eadcc5] bg-white/80 p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-xl font-bold text-[#15251d]"><CreditCard size={20} className="text-[#214a35]" /> Payment method</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                ['razorpay', 'Razorpay'],
                ['cashfree', 'Cashfree'],
                ['paytm', 'Paytm'],
              ].map(([value, label]) => (
                <label key={value} className={`cursor-pointer rounded-xl border p-3 text-sm font-semibold transition ${paymentMethod === value ? 'border-[#075c3d] bg-[#f4faf0] text-[#214a35]' : 'border-[#eadcc5] text-[#584e49]'}`}>
                  <input type="radio" name="payment-method" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value as typeof paymentMethod)} className="mr-2 accent-[#075c3d]" />
                  {label}
                </label>
              ))}
            </div>
            <p className="mt-3 text-sm text-[#584e49]">Pay securely using UPI, cards, net banking, or supported wallets.</p>
            {paymentError && <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-700">{paymentError}</p>}
            <label className="mt-4 flex items-start gap-2 text-sm text-[#584e49]"><input required type="checkbox" className="mt-1 accent-[#075c3d]" /> I agree to the Terms &amp; Conditions</label>
            <button type="submit" disabled={paymentLoading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#075c3d] px-5 py-3.5 font-bold text-white hover:bg-[#064d34] disabled:cursor-wait disabled:opacity-60">{paymentLoading ? 'Opening secure checkout…' : 'Pay securely'} <Check size={18} /></button>
          </section>
        </form>

        <aside className="h-fit rounded-2xl border border-[#eadcc5] bg-[#f8f4e8] p-5 sm:p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl font-black text-[#15251d]">Order Summary</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId)
              if (!product) return null
              return <div key={`${item.productId}-${item.weightGrams ?? 'default'}`} className="flex items-center gap-3"><img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-lg bg-white object-contain" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#1b1714]">{product.name}</p><p className="text-xs text-[#7a675a]">Qty {item.quantity}{item.weightGrams ? ` · ${item.weightGrams} g` : ''}</p></div><span className="text-sm font-bold">₹{(item.unitPrice ?? product.price) * item.quantity}</span></div>
            })}
          </div>
          <div className="my-5 border-t border-[#dfd4c5]" />
          <div className="space-y-3 text-sm text-[#584e49]"><div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-[#1b1714]">₹{total}</span></div><div className="flex justify-between"><span>Shipping</span><span className={`font-semibold ${deliveryCharge === 0 ? 'text-[#1f6245]' : 'text-[#584e49]'}`}>{deliveryCharge === 0 ? `Free above ₹${FREE_DELIVERY_THRESHOLD}` : `₹${deliveryCharge}`}</span></div></div>
          <div className="my-5 border-t border-[#dfd4c5]" />
          <div className="flex justify-between text-xl font-black text-[#15251d]"><span>Total</span><span>₹{orderTotal}</span></div>
          <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#7a675a]"><ShieldCheck size={16} className="shrink-0 text-[#214a35]" /> Your information is used only to complete this order.</p>
        </aside>
      </div>

      <section className="mt-10 grid gap-4 rounded-2xl bg-[#edf4df] p-5 sm:grid-cols-3 sm:p-6">
        {[['Blog & Recipes', Package], ['Sustainability', ShieldCheck], ['Wholesale enquiries', ChevronRight]].map(([label, Icon]) => <div key={label as string} className="flex items-center gap-3 text-sm font-semibold text-[#214a35]"><Icon size={21} />{label as string}</div>)}
      </section>
    </div>
  )
}
