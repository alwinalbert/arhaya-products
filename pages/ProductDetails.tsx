import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import products from '../data/products'
import QuantitySelector from '../components/QuantitySelector'
import { useCartStore } from '../store/cartStore'
import { productWhatsAppMessage, generateWhatsAppUrl } from '../utils/whatsapp'

export default function ProductDetails() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [weightGrams, setWeightGrams] = useState(1000)

  if (!p) return <div className="container mx-auto p-8">Product not found</div>

  const isGramPriced = p.gramPricing === true
  const unitPrice = isGramPriced ? Math.round((p.price * weightGrams) / 1000) : p.price
  const cartOptions = isGramPriced ? { weightGrams, unitPrice } : undefined

  const buyNow = () => {
    addItem(p.id, qty, cartOptions)
    navigate('/checkout')
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={p.images[0]} alt={p.name} className="w-full rounded" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{p.name}</h1>
          <div className="mt-2 text-lg font-bold">₹{unitPrice}</div>
          {isGramPriced && (
            <div className="mt-4 max-w-xs">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Choose quantity</label>
              <select id="weight" value={weightGrams} onChange={(event) => setWeightGrams(Number(event.target.value))} className="mt-1 w-full rounded border p-2">
                {[50, 100, 250, 500, 1000].map((grams) => <option key={grams} value={grams}>{grams} g - ₹{Math.round((p.price * grams) / 1000)}</option>)}
              </select>
              <p className="mt-1 text-xs text-gray-500">Calculated from ₹{p.price} per 1 kg.</p>
            </div>
          )}
          <p className="mt-4 text-gray-700">{p.description}</p>
          <div className="mt-4">
            <QuantitySelector value={qty} onChange={setQty} max={p.stock} />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => addItem(p.id, qty, cartOptions)} className="px-4 py-2 bg-amber-600 text-white rounded">Add to Cart</button>
            <button onClick={buyNow} className="px-4 py-2 border rounded">Buy Now</button>
            <a href={generateWhatsAppUrl(productWhatsAppMessage(p.name))} target="_blank" rel="noreferrer" className="px-4 py-2 bg-green-600 text-white rounded">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  )
}
