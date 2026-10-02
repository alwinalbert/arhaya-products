import React from 'react'

const credentials = [
  { image: '/assets/images/trademark-svgrepo-com.svg', title: 'Trademark Registered', detail: 'Arhaya' },
  { image: '/assets/images/msme-micro-small-medium-enterprises-seeklogo.png', title: 'MSME Registered', detail: 'Business registration' },
  { image: '/assets/images/FSSAI-logo-brandlogos-5dd349.svg', title: 'FSSAI Licensed', detail: 'Food business operator' },
  { image: '/assets/images/legalmetrology.jpeg', title: 'Legal Metrology Registered', detail: 'Packaged goods compliance' },
]

type CredentialStripProps = {
  compact?: boolean
}

export default function CredentialStrip({ compact = false }: CredentialStripProps) {
  return (
    <section
      aria-label="Arhaya registrations and licenses"
      className={compact
        ? 'border-y border-[#2f513d] bg-transparent text-white'
        : 'border-y border-[#e6dbc9] bg-[#fbf7f0]'}
    >
      <div className={`container mx-auto grid ${compact ? 'gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4' : 'gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4'}`}>
        {credentials.map(({ image, title, detail }) => (
          <div key={title} className={`flex items-center gap-2.5 ${compact ? 'border-[#2f513d] sm:border-l sm:pl-4 first:border-l-0 first:pl-0' : 'border-[#e6dbc9] sm:border-l sm:pl-4 first:border-l-0 first:pl-0'}`}>
            <div className={`flex shrink-0 items-center justify-center rounded-lg p-1.5 shadow-sm ring-1 ${compact ? 'h-12 w-16 bg-[#dce9d6] ring-[#dce9d6]' : 'h-14 w-16 bg-white ring-[#e5ddcf]'}`}>
              <img src={image} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className={`text-[9px] font-bold uppercase tracking-[0.1em] ${compact ? 'text-[#e4f0dc]' : 'text-[#214a35]'}`}>{title}</p>
              <p className={`mt-0.5 text-[10px] ${compact ? 'text-[#bdd0c0]' : 'text-[#7a675a]'}`}>{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}