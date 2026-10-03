import React from 'react'
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import products from '../data/products'
import { FREE_DELIVERY_THRESHOLD, getDeliveryCharge } from '../utils/shipping'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const update = useCartStore((state) => state.updateQuantity)
  const remove = useCartStore((state) => state.removeItem)
  const total = useCartStore((state) => state.getTotal())
  const deliveryCharge = getDeliveryCharge(total)
  const orderTotal = total + deliveryCharge

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e5efd7] text-[#214a35]"><ShieldCheck size={30} /></div>
        <h1 className="mt-5 text-3xl font-black text-[#15251d]">Your cart is waiting</h1>
        <p className="mt-2 text-[#584e49]">Explore our botanical essentials and build a considered daily ritual.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#075c3d] px-6 py-3 font-bold text-white">Start Shopping <ArrowRight size={17} /></Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 sm:py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#214a35]"><ArrowLeft size={16} /> Continue shopping</Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a675a]">Your ritual</p><h1 className="mt-1 text-4xl font-black tracking-tight text-[#15251d]">Shopping Cart</h1></div>
        <p className="text-sm text-[#584e49]">{items.reduce((sum, item) => sum + item.quantity, 0)} items</p>
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {items.map((item) => {
            const product = products.find((entry) => entry.id === item.productId)
            if (!product) return null
            const unitPrice = item.unitPrice ?? product.price
            return (
              <article key={`${item.productId}-${item.weightGrams ?? 'default'}`} className="flex gap-4 rounded-2xl border border-[#eadcc5] bg-white/80 p-4 shadow-sm sm:gap-6 sm:p-5">
                <Link to={`/products/${product.slug}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f5eee3] sm:h-36 sm:w-36">
                  <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a675a]">{product.category ?? 'Botanical essential'}</p><h2 className="mt-1 text-lg font-bold text-[#1b1714]">{product.name}</h2>{item.weightGrams && <p className="mt-1 text-sm text-[#584e49]">Pack size: {item.weightGrams} g</p>}</div>
                    <button type="button" onClick={() => remove(product.id, item.weightGrams)} aria-label={`Remove ${product.name}`} className="text-[#927b68] hover:text-rose-600"><Trash2 size={17} /></button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                    <div className="inline-flex items-center overflow-hidden rounded-xl border border-[#dfd4c5] bg-[#fffdf9]">
                      <button type="button" aria-label="Decrease quantity" onClick={() => update(product.id, item.quantity - 1)} className="p-2.5 text-[#214a35] hover:bg-[#f2eadc]"><Minus size={15} /></button>
                      <span className="min-w-9 text-center text-sm font-bold">{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => update(product.id, item.quantity + 1)} className="p-2.5 text-[#214a35] hover:bg-[#f2eadc]"><Plus size={15} /></button>
                    </div>
                    <p className="text-xl font-black text-[#15251d]">₹{unitPrice * item.quantity}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </section>

        <aside className="h-fit rounded-2xl border border-[#eadcc5] bg-[#f8f4e8] p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl font-black text-[#15251d]">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm text-[#584e49]"><div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-[#1b1714]">₹{total}</span></div><div className="flex justify-between"><span>Delivery</span><span className={`font-semibold ${deliveryCharge === 0 ? 'text-[#1f6245]' : 'text-[#584e49]'}`}>{deliveryCharge === 0 ? `Free above ₹${FREE_DELIVERY_THRESHOLD}` : `₹${deliveryCharge}`}</span></div></div>
          <div className="my-5 border-t border-[#dfd4c5]" />
          <div className="flex justify-between text-lg font-black text-[#15251d]"><span>Total</span><span>₹{orderTotal}</span></div>
          <Link to="/checkout" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#075c3d] px-5 py-3.5 font-bold text-white hover:bg-[#064d34]">Proceed to Checkout <ArrowRight size={17} /></Link>
          <p className="mt-4 text-center text-xs leading-5 text-[#7a675a]">Secure checkout · Thoughtful delivery across India</p>
        </aside>
      </div>
    </div>
  )
}
