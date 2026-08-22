import React from 'react'
import { Leaf } from 'lucide-react'

export default function AnnouncementBar() {
  return (
    <div className="bg-[#efe5d6] text-[#544126] text-sm font-medium py-2.5 text-center tracking-[0.12em] uppercase">
      <span className="inline-flex items-center justify-center gap-2">
        <Leaf size={14} />
        Free shipping across India
      </span>
    </div>
  )
}
