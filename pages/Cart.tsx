import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import products from '../data/products'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const update = useCartStore((s) => s.updateQuantity)
  const remove = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.getTotal())

  if (items.length === 0)
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-xl">Your cart is empty.</h2>
        <Link to="/shop" className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded">Start Shopping</Link>
      </div>
    )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((it) => {
            const p = products.find((x) => x.id === it.productId)!
            return (
              <div key={it.productId} className="flex items-center gap-4 border-b pb-4">
                <img src={p.images[0]} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">{it.weightGrams ? `${it.weightGrams} g - ` : ''}₹{it.unitPrice ?? p.price}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => update(p.id, it.quantity - 1)} className="px-2 border">-</button>
                    <div>{it.quantity}</div>
                    <button onClick={() => update(p.id, it.quantity + 1)} className="px-2 border">+</button>
                    <button onClick={() => remove(p.id)} className="text-rose-500 ml-4">Remove</button>
                  </div>
                </div>
                <div>₹{(it.unitPrice ?? p.price) * it.quantity}</div>
              </div>
            )
          })}
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Order Summary</h3>
          <div className="mt-2 flex justify-between text-gray-600"> <span>Subtotal</span> <span>₹{total}</span></div>
          <div className="mt-2 flex justify-between text-gray-600"> <span>Shipping</span> <span>₹40</span></div>
          <div className="mt-2 flex justify-between text-gray-800 font-semibold"> <span>Total</span> <span>₹{total + 40}</span></div>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/shop" className="px-4 py-2 border rounded text-center">Continue Shopping</Link>
            <Link to="/checkout" className="px-4 py-2 bg-amber-600 text-white rounded text-center">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
