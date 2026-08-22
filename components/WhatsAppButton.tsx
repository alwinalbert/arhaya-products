import React from 'react'
import { MessageCircle } from 'lucide-react'
import { generateWhatsAppUrl } from '../utils/whatsapp'

export default function WhatsAppButton() {
  const url = generateWhatsAppUrl('Hi Arhaya Products')

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
    >
      <MessageCircle size={24} strokeWidth={2.2} />
    </a>
  )
}
