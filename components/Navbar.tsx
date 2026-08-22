import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Camera, Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const count = useCartStore((s) => s.getItemCount())
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-[#e7dfd3] bg-[#f7f3ee]/90 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-5">
          <button className="md:hidden rounded-full border border-[#dac7a7] p-2 text-[#3d3122]">
            <Menu size={18} />
          </button>

          <Link to="/" className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-[#1f1a17]">
            <img src="/assets/images/logo.jpg" alt="Arhaya logo" className="h-9 w-9 rounded-full object-cover" />
            Arhaya
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link to="/" className="text-sm font-medium text-[#4f453d] hover:text-[#1f1a17]">Home</Link>
            <Link to="/shop" className="text-sm font-medium text-[#4f453d] hover:text-[#1f1a17]">Shop</Link>
            <Link to="/about" className="text-sm font-medium text-[#4f453d] hover:text-[#1f1a17]">Our Story</Link>
            <a href="https://www.instagram.com/arhaya_products" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-[#4f453d] hover:text-[#1f1a17]">
              <Camera size={15} />
              Instagram
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button aria-label="search" className="hidden rounded-full border border-[#e3d9ca] bg-white p-2.5 text-[#3d3122] md:inline-flex">
            <Search size={16} />
          </button>
          <button aria-label="wishlist" className="hidden rounded-full border border-[#e3d9ca] bg-white p-2.5 text-[#3d3122] md:inline-flex">
            <Heart size={16} />
          </button>
          <button aria-label="cart" onClick={() => navigate('/cart')} className="relative inline-flex items-center gap-2 rounded-full bg-[#1e2a22] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#0f1714]">
            <ShoppingBag size={16} />
            Cart
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b76e3c] px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
