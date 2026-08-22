import React from 'react'
import { Camera, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#e6dbcd] bg-[#f4efe9] py-12 text-[#2f2a27]">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-3 text-2xl font-semibold tracking-tight">
            <img src="/assets/images/logo.jpg" alt="Arhaya logo" className="h-10 w-10 rounded-full object-cover" />
            Arhaya
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#5d4f45]">
            Thoughtful botanical essentials designed for everyday rituals and naturally beautiful routines.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://www.instagram.com/arhaya_products" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d1b1a] shadow-sm ring-1 ring-[#e4d7c8] hover:shadow-md">
              <Camera size={18} />
            </a>
            <a href="https://wa.me/919876543210?text=Hi%20Arhaya%20Products" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm hover:shadow-md">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a675a]">Shop</h5>
          <ul className="space-y-2 text-sm text-[#4d413b]">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/shop">Best Sellers</Link></li>
            <li><Link to="/about">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a675a]">Help</h5>
          <ul className="space-y-2 text-sm text-[#4d413b]">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a675a]">Legal</h5>
          <ul className="space-y-2 text-sm text-[#4d413b]">
            <li><Link to="/privacy-policy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/shipping-policy">Shipping</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#e6dbcd] pt-5 text-sm text-[#675b53] md:flex-row">
        <div>© {new Date().getFullYear()} Arhaya Products</div>
        <a href="https://www.instagram.com/arhaya_products" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-[#1f1a17]">
          Follow on Instagram <ArrowUpRight size={16} />
        </a>
      </div>
    </footer>
  )
}
