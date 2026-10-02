import React from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import WHATSAPP_NUMBER, { generateWhatsAppUrl } from '../utils/whatsapp'

export default function WhatsAppButton() {
  const url = generateWhatsAppUrl('Hi Arhaya Products')

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={`tel:${WHATSAPP_NUMBER}`}
        aria-label="Call Arhaya"
        title="Call Arhaya"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#214a35] text-white shadow-[0_12px_28px_rgba(33,74,53,0.28)] transition-transform hover:scale-105"
      >
        <Phone size={22} strokeWidth={2.2} />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#214a35] text-white shadow-[0_12px_28px_rgba(33,74,53,0.28)] transition-transform hover:scale-105"
      >
        <MessageCircle size={24} strokeWidth={2.2} />
      </a>
    </div>
  )
}
