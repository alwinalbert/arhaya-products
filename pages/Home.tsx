import React from 'react'
import { ArrowRight, Camera, Leaf, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'

const highlights = [
  { icon: Leaf, title: 'Plant-led wellbeing', text: 'Familiar botanicals chosen to bring a more grounded, mindful rhythm to everyday life.' },
  { icon: ShieldCheck, title: 'Nature-led solutions', text: 'Thoughtfully made essentials that turn nature’s wisdom into practical daily care.' },
  { icon: Star, title: 'Care for tomorrow', text: 'Small, considered choices for a healthier quality of life today and a more resilient future.' },
]

export default function Home() {
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden bg-[#f3eadf]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(214,180,128,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(108,137,112,0.18),transparent_28%)]" />
        <div className="container relative mx-auto grid min-h-[540px] items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7c1a5] bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5d4f45] shadow-sm">
              <Leaf size={12} />
              Botanical care · Future health
            </p>
            <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.06em] text-[#1b1714] sm:text-5xl md:text-7xl">
              Nature’s glow,
              <span className="mt-2 block text-[#214a35]">thoughtfully bottled.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-[#514a46] sm:text-lg sm:leading-8 md:text-xl">
              Arhaya brings familiar botanicals into modern rituals — gentle, grounded, and beautifully simple for everyday wellbeing and a healthier future.
            </p>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#214a35] sm:text-lg sm:leading-8">
              Nature-led solutions for better living today and a more resilient tomorrow.
            </p>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#584e49] sm:text-lg sm:leading-8">
              Founded by two engineers, Arhaya is making thoughtful, nature-led choices easier to bring into everyday family life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#1f2d29] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_25px_rgba(31,45,41,0.15)] hover:-translate-y-0.5 hover:bg-[#10201b]">
                Shop now <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-[#d7c1a5] bg-white/75 px-7 py-3.5 text-base font-semibold text-[#2b2421] hover:bg-white">
                Our philosophy
              </Link>
            </div>
          </div>

          <div className="relative lg:pl-5">
            <div className="absolute -inset-4 rounded-[40px] bg-[#d9c3a3]/35 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-[#e4d6c0] bg-[#1d2b21] p-2 shadow-[0_30px_60px_rgba(70,53,38,0.18)]">
              <img src="/assets/images/three together.png" alt="Arhaya botanical essentials" className="aspect-[4/5] w-full rounded-[26px] object-cover" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#fffaf2]/90 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2d382d] backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-full sm:text-xs sm:tracking-[0.14em]">
                <span>Three daily essentials</span>
                <span className="text-[#9a6b2f]">Made with care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-16 mb-14">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[24px] border border-[#eadcc5] bg-white/70 p-6 shadow-[0_10px_22px_rgba(56,42,29,0.03)] backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#efe2d0] text-[#214a35]">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[#1b1714]">{title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-[#584e49]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto my-20">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7a675a]">Shop the ritual</p>
            <h2 className="text-3xl font-black tracking-tight text-[#1b1714] md:text-5xl">Best Sellers</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-2 text-sm font-semibold text-[#214a35] md:inline-flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid />
      </section>

      <section className="container mx-auto my-20">
        <div className="rounded-[32px] border border-[#e5d9c7] bg-[linear-gradient(135deg,#fbf7f2,#f3ebdf)] p-8 shadow-[0_16px_40px_rgba(71,52,35,0.06)] md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.2fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#7a675a]">Introduction to Arhaya</p>
              <h3 className="text-3xl font-black tracking-tight text-[#1b1714] md:text-4xl">Two engineers. One healthier future.</h3>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#514a46]">
              <p>
                Arhaya was founded by two engineers with a shared vision: to make everyday wellbeing more accessible through pure, nature-led alternatives. We started with a simple belief that health can begin with thoughtful choices from nature.
              </p>
              <p>
                From healthier, tastier family routines to a more resilient future, Arhaya brings nature’s finest solutions into daily life with care, simplicity, and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto mb-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a675a]">From the ritual journal</p>
            <h3 className="text-3xl font-black tracking-tight text-[#1b1714] md:text-4xl">Follow @arhaya_products</h3>
          </div>
          <a href="https://www.instagram.com/arhaya_products" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#d7c1a5] bg-white px-4 py-2.5 text-sm font-semibold text-[#214a35] shadow-sm hover:-translate-y-0.5 hover:bg-[#f7f1ea]">
            <Camera size={16} /> View Instagram
          </a>
        </div>
      </section>
    </div>
  )
}
