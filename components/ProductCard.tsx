import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  const add = useCartStore((s) => s.addItem)

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <div className="card-hover overflow-hidden rounded-[28px] border border-[#ebdfd0] bg-white/80 p-3 shadow-[0_12px_30px_rgba(47,35,24,0.05)] backdrop-blur-sm">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden rounded-[20px]">
        <img src={product.images[0]} alt={product.name} className="h-64 w-full rounded-[20px] object-cover transition-transform duration-500 hover:scale-[1.03]" />
      </Link>
      <div className="mt-4 px-1 pb-1">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a675a]">
          <span>Botanical</span>
          {discount > 0 && <span className="rounded-full bg-[#eef7f0] px-2 py-1 text-[#2f6d50]">{discount}% off</span>}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-stone-900">{product.name}</h3>
        <div className="mt-3 flex items-end gap-2">
          <div className="text-2xl font-bold text-stone-900">₹{product.price}</div>
          {product.originalPrice && <div className="text-sm text-stone-400 line-through">₹{product.originalPrice}</div>}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => add(product.id, 1)} className="flex-1 rounded-full bg-[#1f2d29] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f1714]">Add to Cart</button>
          <Link to={`/products/${product.slug}`} className="rounded-full border border-[#e1d4c1] bg-[#f8f3ee] px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-[#d3b594] hover:bg-[#f1e7db]">View</Link>
        </div>
      </div>
    </div>
  )
}
