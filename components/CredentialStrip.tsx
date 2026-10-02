import React from 'react'
import { BadgeCheck, Building2, Scale, ShieldCheck } from 'lucide-react'

const credentials = [
  { icon: BadgeCheck, title: 'Trademark Registered', detail: 'Arhaya' },
  { icon: Building2, title: 'MSME Registered', detail: 'Business registration' },
  { icon: ShieldCheck, title: 'FSSAI Licensed', detail: 'Food business operator' },
  { icon: Scale, title: 'Legal Metrology Registered', detail: 'Packaged goods compliance' },
]

type CredentialStripProps = {
  compact?: boolean
}

export default function CredentialStrip({ compact = false }: CredentialStripProps) {
  return (
    <section
      aria-label="Arhaya registrations and licenses"
      className={compact
        ? 'border-y border-[#2f513d] bg-[#173b2b] text-white'
        : 'border-y border-[#e6dbc9] bg-[#fbf7f0]'}
    >
      <div className={`container mx-auto grid ${compact ? 'gap-5 py-7 sm:grid-cols-2 lg:grid-cols-4' : 'gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4'}`}>
        {credentials.map(({ icon: Icon, title, detail }) => (
          <div key={title} className={`flex items-center gap-3 ${compact ? 'border-[#2f513d] sm:border-l sm:pl-5 first:border-l-0 first:pl-0' : 'border-[#e6dbc9] sm:border-l sm:pl-4 first:border-l-0 first:pl-0'}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${compact ? 'bg-[#dce9d6] text-[#173b2b]' : 'bg-[#e9f0e1] text-[#214a35]'}`}>
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className={`text-[10px] font-bold uppercase tracking-[0.12em] ${compact ? 'text-[#e4f0dc]' : 'text-[#214a35]'}`}>{title}</p>
              <p className={`mt-1 text-xs ${compact ? 'text-[#bdd0c0]' : 'text-[#7a675a]'}`}>{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}