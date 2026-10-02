import React from 'react'
import { Camera, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { generateWhatsAppUrl } from '../utils/whatsapp'
import CredentialStrip from './CredentialStrip'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#2f513d] bg-[#173b2b] py-8 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-3 text-xl font-semibold tracking-tight">
            <img src="/assets/images/logo.jpg" alt="Arhaya logo" className="h-9 w-9 rounded-full object-cover" />
            Arhaya
          </div>
          <p className="max-w-sm text-xs leading-5 text-[#bdd0c0]">
            Thoughtful botanical essentials designed for everyday rituals and naturally beautiful routines.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a href="https://www.instagram.com/arhaya_products" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce9d6] text-[#173b2b] shadow-sm ring-1 ring-[#2f513d] hover:shadow-md">
              <Camera size={16} />
            </a>
            <a href={generateWhatsAppUrl('Hi Arhaya Products')} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm hover:shadow-md">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dce9d6]">Shop</h5>
          <ul className="space-y-1.5 text-xs text-[#bdd0c0]">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/shop">Best Sellers</Link></li>
            <li><Link to="/about">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dce9d6]">Help</h5>
          <ul className="space-y-1.5 text-xs text-[#bdd0c0]">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dce9d6]">Legal</h5>
          <ul className="space-y-1.5 text-xs text-[#bdd0c0]">
            <li><Link to="/privacy-policy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/shipping-policy">Shipping</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dce9d6]">Registered address</h5>
          <address className="not-italic text-xs leading-5 text-[#bdd0c0]">
            Arhaya Products<br />
            Thottabhagom PO<br />
            Thiruvalla<br />
            Pathanamthitta, Kerala<br />
            India
          </address>
        </div>
      </div>

      <div className="mt-6">
        <CredentialStrip compact />
      </div>

      <div className="container mx-auto mt-5 flex flex-col items-center justify-between gap-2 border-t border-[#2f513d] pt-4 text-xs text-[#bdd0c0] md:flex-row">
        <div>© {new Date().getFullYear()} Arhaya Products</div>
        <a href="https://www.instagram.com/arhaya_products" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-[#f6f2e9]">
          Follow on Instagram <ArrowUpRight size={16} />
        </a>
      </div>
    </footer>
  )
}
