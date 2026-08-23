import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import products from '../data/products'
import { generateWhatsAppUrl, orderWhatsAppMessage } from '../utils/whatsapp'

const UPI_ID = 'stk-9400924800@okbizaxis'

function generateOrderId() {
  return 'ARH-' + Math.random().toString(36).substr(2, 6).toUpperCase()
}

export default function Checkout() {
  const items = useCartStore((s) => s.items)
  const total = useCartStore((s) => s.getTotal())
  const clear = useCartStore((s) => s.clearCart)
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pin: '', transactionId: '' })
  const [isMobileDevice] = useState(() => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
  const [upiCopied, setUpiCopied] = useState(false)

  const copyUpiId = async () => {
    await navigator.clipboard.writeText(UPI_ID)
    setUpiCopied(true)
  }

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address || !form.pin || !form.transactionId) {
      return alert('Please fill all required fields')
    }
    const orderId = generateOrderId()
    const order = { id: orderId, items, subtotal: total, deliveryCharge: 0, total, customer: form, payment: 'upi', transactionId: form.transactionId }
    localStorage.setItem('last_order', JSON.stringify(order))
    const orderItems = items.map((item) => ({
      productName: products.find((product) => product.id === item.productId)?.name || item.productId,
      quantity: item.quantity,
      weightGrams: item.weightGrams,
    }))
    window.open(generateWhatsAppUrl(orderWhatsAppMessage(orderId, form, orderItems, total, 'upi', form.transactionId)), '_blank', 'noopener,noreferrer')
    clear()
    navigate('/order-success')
  }

  if (items.length === 0) return <div className="container mx-auto p-8">Your cart is empty.</div>

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <form onSubmit={(event) => { event.preventDefault(); placeOrder() }} className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <div className="grid grid-cols-1 gap-3">
          <input required placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="p-2 border rounded" />
          <input required type="tel" inputMode="tel" placeholder="Phone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="p-2 border rounded" />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="p-2 border rounded" />
          <input required placeholder="Address *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="p-2 border rounded" />
          <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="p-2 border rounded" />
          <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="p-2 border rounded" />
            <input required inputMode="numeric" placeholder="PIN Code *" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} className="p-2 border rounded" />
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Payment</h2>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-2"><input type="radio" name="pay" checked readOnly /> UPI</label>
        </div>
        <div className="mt-4 rounded border bg-amber-50 p-4">
          <div className="text-sm text-gray-600">Pay securely via UPI</div>
          <div className="mt-1 font-semibold">UPI ID: {UPI_ID}</div>
          {isMobileDevice ? (
            <a
              href={`upi://pay?pa=${UPI_ID}&pn=Arhaya%20Products&am=${total}&cu=INR`}
              className="mt-3 inline-block rounded bg-amber-600 px-4 py-2 font-semibold text-white"
            >
              Pay ₹{total} via UPI
            </a>
          ) : (
            <button type="button" onClick={copyUpiId} className="mt-3 rounded bg-amber-600 px-4 py-2 font-semibold text-white">
              {upiCopied ? 'UPI ID copied' : 'Copy UPI ID'}
            </button>
          )}
          {!isMobileDevice && <p className="mt-2 text-sm text-gray-600">Open your UPI app, pay ₹{total}, then enter the transaction ID below.</p>}
        </div>
        <div className="mt-4">
          <input required placeholder="Transaction ID *" value={form.transactionId} onChange={(e) => setForm({ ...form, transactionId: e.target.value })} className="w-full p-2 border rounded" />
          <p className="mt-1 text-sm text-gray-500">Complete the UPI payment, then enter the transaction ID shown by your payment app.</p>
        </div>
        <div className="mt-6">
          <button type="submit" className="px-6 py-3 bg-amber-600 text-white rounded">Place Order</button>
        </div>
      </form>

      <aside className="p-4 border rounded">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="mt-2">Items: {items.length}</div>
        <div className="mt-2">Delivery Charge: <span className="font-semibold text-green-700">Free</span></div>
        <div className="mt-2">Total: ₹{total}</div>
      </aside>
    </div>
  )
}
