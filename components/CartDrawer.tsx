import React from 'react'
import { useCartStore } from '../store/cartStore'
import products from '../data/products'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const remove = useCartStore((s) => s.removeItem)
  const total = useCartStore((s) => s.getTotal())

  if (items.length === 0) return null

  return (
    <div className="fixed right-4 bottom-4 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
      <h4 className="font-semibold">Cart</h4>
      <div className="mt-2 space-y-2">
        {items.map((it) => {
          const p = products.find((x) => x.id === it.productId)!
          return (
            <div key={it.productId} className="flex items-center gap-2">
              <img src={p.images[0]} className="w-12 h-12 object-cover rounded" />
              <div className="flex-1">
                <div className="text-sm">{p.name}</div>
                <div className="text-xs text-gray-500">{it.weightGrams ? `${it.weightGrams} g x ` : 'Qty: '}{it.quantity}</div>
              </div>
              <div className="text-sm">₹{(it.unitPrice ?? p.price) * it.quantity}</div>
              <button onClick={() => remove(it.productId)} className="text-rose-500 text-sm">Remove</button>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Subtotal</div>
          <div className="font-semibold">₹{total}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/cart" className="px-3 py-2 border rounded text-sm">View Cart</Link>
          <Link to="/checkout" className="px-3 py-2 bg-amber-600 text-white rounded text-sm">Checkout</Link>
        </div>
      </div>
    </div>
  )
}
