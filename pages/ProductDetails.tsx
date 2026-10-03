import React, { useState } from 'react'
import { ChevronDown, Leaf, LockKeyhole, PackageCheck, RotateCcw, ShoppingCart, Star, Truck } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import products from '../data/products'
import QuantitySelector from '../components/QuantitySelector'
import { useCartStore } from '../store/cartStore'

const detailSections = [
  ['Description', 'A thoughtfully prepared botanical essential made for simple, everyday routines.'],
  ['Ingredients', 'Made with the ingredient listed in the product name, with no unnecessary additions.'],
  ['How It’s Made', 'Prepared in careful stages to preserve a clean texture and a consistent everyday experience.'],
  ['How to Use', 'Use as part of your regular home, kitchen, or personal-care routine according to the product type.'],
  ['Storage Instructions', 'Store in a cool, dry place away from direct sunlight and keep the container tightly closed after use.'],
  ['Shipping & Delivery', 'We deliver across India. Orders are typically dispatched within 1–2 business days.'],
  ['FAQs', 'Need help choosing a product or pack size? Contact the Arhaya team and we will be happy to help.'],
] as const

export default function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const navigate = useNavigate()
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [weightGrams, setWeightGrams] = useState(() => product?.packOptions?.[0]?.grams ?? 1000)
  const [activeImage, setActiveImage] = useState(0)
  const [openSection, setOpenSection] = useState<string | null>('Description')

  if (!product) return <div className="container mx-auto py-16 text-center"><h1 className="text-2xl font-bold">Product not found</h1></div>

  const isGramPriced = product.gramPricing === true
  const packOptions = product.packOptions ?? []
  const selectedPack = packOptions.find((option) => option.grams === weightGrams)
  const price = isGramPriced ? (selectedPack?.price ?? product.price) : product.price
  const originalPrice = isGramPriced ? (selectedPack?.originalPrice ?? product.originalPrice) : product.originalPrice
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const cartOptions = isGramPriced ? { weightGrams, unitPrice: price } : undefined

  const addToCart = () => addItem(product.id, quantity, cartOptions)
  const buyNow = () => {
    addToCart()
    navigate('/checkout')
  }

  return (
    <div className="container mx-auto py-8 sm:py-12">
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="overflow-hidden rounded-[26px] border border-[#eadcc5] bg-[radial-gradient(circle_at_50%_25%,#fffdf8,#eadcc7)]">
            <img src={product.images[activeImage] ?? product.images[0]} alt={product.name} className="aspect-square w-full object-contain p-6 sm:p-10" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.concat(product.images).slice(0, 4).map((image, index) => (
              <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index % product.images.length)} className={`overflow-hidden rounded-xl border bg-[#f7f0e6] ${activeImage === index % product.images.length ? 'border-[#214a35] ring-1 ring-[#214a35]' : 'border-[#eadcc5]'}`}>
                <img src={image} alt={`${product.name} view ${index + 1}`} className="aspect-square w-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a675a]">{product.category ?? 'Botanical essential'}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight tracking-[-0.04em] text-[#15251d] sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-[#584e49]">{product.shortDescription ?? product.description}</p>
          <div className="mt-5 flex items-center gap-2">
            <div className="flex gap-0.5 text-[#e58a16]" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={20} fill="currentColor" />)}</div>
            <span className="text-sm text-[#584e49]">(Verified customer favourites)</span>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-black text-[#15251d]">₹{price}</span>
            {originalPrice && <span className="pb-1 text-lg text-stone-400 line-through">₹{originalPrice}</span>}
            {discount > 0 && <span className="mb-1 rounded-full bg-[#dcebdc] px-3 py-1 text-sm font-bold text-[#1f6245]">{discount}% OFF</span>}
          </div>

          {isGramPriced && (
            <div className="mt-7">
              <p className="mb-2 font-semibold text-[#1b1714]">Net quantity</p>
              <div className="flex flex-wrap gap-2">
                {packOptions.map((option) => (
                  <button key={option.grams} type="button" onClick={() => setWeightGrams(option.grams)} className={`rounded-xl border px-5 py-2.5 text-sm font-semibold ${weightGrams === option.grams ? 'border-[#214a35] bg-[#f0f7ee] text-[#214a35] ring-1 ring-[#214a35]' : 'border-[#dfd4c5] bg-white text-[#4f453d]'}`}>
                    {option.grams >= 1000 ? `${option.grams / 1000} kg` : `${option.grams} g`}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <span className="font-semibold text-[#1b1714]">Qty</span>
            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={addToCart} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075c3d] px-5 py-3.5 font-bold text-white shadow-sm hover:bg-[#064d34]"><ShoppingCart size={18} /> Add to Cart</button>
            <button type="button" onClick={buyNow} className="rounded-xl bg-[#f2ecd9] px-5 py-3.5 font-bold text-[#1b1714] hover:bg-[#e9e0c8]">Buy Now</button>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 rounded-[26px] bg-[#f8f4e8] p-6 sm:grid-cols-3 sm:p-8">
        {[[Truck, 'Delivery', 'Free above ₹220'], [LockKeyhole, 'Secure Payments', 'Safe checkout'], [RotateCcw, 'Easy Returns', 'Simple support']].map(([Icon, title, text]) => (
          <div key={title as string} className="flex items-center gap-4 text-[#214a35]">
            <Icon size={31} strokeWidth={1.7} />
            <div><p className="font-bold text-[#1b1714]">{title as string}</p><p className="text-sm text-[#584e49]">{text as string}</p></div>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-[26px] bg-[#f8f4e8] p-6 sm:p-8">
        <h2 className="text-3xl font-black tracking-tight text-[#15251d]">Why You’ll Love It</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {['Thoughtfully made', 'Plant-led routine', 'Simple to use', 'Everyday essential', 'Made with care'].map((benefit) => (
            <div key={benefit} className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5efd7] text-[#214a35]"><Leaf size={26} /></div><p className="mt-3 text-sm font-semibold text-[#38443d]">{benefit}</p></div>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-2">
        {detailSections.map(([title, text]) => (
          <div key={title} className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white/75">
            <button type="button" onClick={() => setOpenSection(openSection === title ? null : title)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-[#1b1714]">{title}</span><ChevronDown size={19} className={`text-[#214a35] transition-transform ${openSection === title ? 'rotate-180' : ''}`} />
            </button>
            {openSection === title && <p className="border-t border-[#f0e7da] px-5 pb-5 pt-3 text-sm leading-6 text-[#584e49]">{title === 'Description' ? product.description : text}</p>}
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-black tracking-tight text-[#15251d]">You May Also Like</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((item) => item.id !== product.id).map((item) => (
            <Link key={item.id} to={`/products/${item.slug}`} className="rounded-2xl border border-[#eadcc5] bg-white/80 p-3 shadow-sm hover:-translate-y-1">
              <img src={item.images[0]} alt={item.name} className="aspect-[4/3] w-full rounded-xl bg-[#f5eee3] object-contain" />
              <h3 className="mt-3 font-bold text-[#1b1714]">{item.name}</h3>
              <p className="mt-1 font-bold text-[#214a35]">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
