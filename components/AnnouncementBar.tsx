import React from 'react'
import { Leaf } from 'lucide-react'

export default function AnnouncementBar() {
  const messages = [
    'Free shipping across India',
    'Nature-led essentials for everyday rituals',
    'Thoughtful choices for healthier routines',
    'Secure payment via UPI',
  ]

  return (
    <div className="announcement-bar overflow-hidden bg-[#efe5d6] py-2.5 text-[#544126]" aria-label="Store announcements">
      <div className="announcement-track flex w-max">
        {[0, 1].map((track) => (
          <div key={track} className="flex shrink-0 items-center" aria-hidden={track === 1}>
            {messages.map((message) => (
              <span key={message} className="mx-8 inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.16em] md:mx-12">
                <Leaf size={14} strokeWidth={1.8} />
                {message}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
