import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../types/product'
import { useCartStore } from '../store/cartStore'

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  const add = useCartStore((s) => s.addItem)

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const currentScrollY = window.scrollY
    add(product.id, 1)
    event.currentTarget.blur()

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' })
    })
  }

  const packOptions = product.packOptions ?? (product.gramPricing
    ? [50, 100, 250, 500, 1000].map((grams) => ({
      grams,
      price: Math.round((product.price * grams) / 1000),
      originalPrice: Math.round(((product.originalPrice ?? product.price) * grams) / 1000),
    }))
    : undefined)
  const lowestPack = packOptions?.reduce((lowest, option) => option.price < lowest.price ? option : lowest)
  const displayPrice = lowestPack?.price ?? product.price
  const displayOriginalPrice = lowestPack?.originalPrice ?? product.originalPrice
  const discount = displayOriginalPrice ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100) : 0
  const productType = product.name.toLowerCase().includes('deodorant') ? 'Mineral Based' : 'Botanical'

  return (
    <div className="card-hover overflow-hidden rounded-[28px] border border-[#ebdfd0] bg-white/80 p-3 shadow-[0_12px_30px_rgba(47,35,24,0.05)] backdrop-blur-sm">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden rounded-[20px]">
        <img src={product.images[0]} alt={product.name} className="h-64 w-full rounded-[20px] object-cover transition-transform duration-500 hover:scale-[1.03]" />
      </Link>
      <div className="mt-4 px-1 pb-1">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a675a]">
          <span>{productType}</span>
          {discount > 0 && <span className="rounded-full bg-[#eef7f0] px-2 py-1 text-[#2f6d50]">{discount}% off</span>}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">{product.name}</h3>
        {product.shortDescription && <p className="mt-1 text-sm leading-6 text-stone-500">{product.shortDescription}</p>}
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">Sale price</div>
            <div className="text-2xl font-bold text-stone-900">₹{displayPrice}</div>
          </div>
          {displayOriginalPrice && (
            <div className="pb-1 text-sm text-stone-400">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em]">MRP</span>
              <span className="line-through">₹{displayOriginalPrice}</span>
            </div>
          )}
        </div>
        {product.packSize && <div className="mt-1 text-xs text-stone-500">Pack size: {product.packSize}</div>}
        {product.gramPricing && <div className="mt-1 text-xs text-stone-500">From {lowestPack?.grams ?? 1000} g · Choose your pack size.</div>}
        <div className="mt-4 flex gap-2">
          {product.gramPricing ? (
            <Link to={`/products/${product.slug}`} className="flex-1 rounded-full bg-[#1f2d29] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#0f1714]">Choose weight</Link>
          ) : (
            <button type="button" onClick={handleAddToCart} className="flex-1 rounded-full bg-[#1f2d29] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f1714]">Add to Cart</button>
          )}
          <Link to={`/products/${product.slug}`} className="rounded-full border border-[#e1d4c1] bg-[#f8f3ee] px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-[#d3b594] hover:bg-[#f1e7db]">View</Link>
        </div>
      </div>
    </div>
  )
}
