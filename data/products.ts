import { Product } from '../types/product'

const products: Product[] = [
  {
    id: 'p1',
    slug: 'wild-turmeric',
    name: 'Wild Turmeric (Kasthoori Manjal)',
    price: 2500,
    originalPrice: 3500,
    description:
      '100% pure wild turmeric powder. Great for skin and overall wellness. Sourced ethically.',
    shortDescription: 'Pure Kasthoori Manjal — skin & glow care',
    images: ['/assets/images/manjal.png', '/assets/images/three together.png'],
    category: 'Wellness',
    stock: 120,
    featured: true,
    bestseller: true,
    gramPricing: true,
  },
  {
    id: 'p2',
    slug: 'mineral-deodorant',
    name: 'Mineral Deodorant (Unscented)',
    price: 380,
    originalPrice: 999,
    description: 'Natural mineral deodorant stick — chemical-free and gentle on skin.',
    shortDescription: 'Gentle, chemical-free mineral deodorant',
    images: ['/assets/images/deodrant.png', '/assets/images/deodrant specialities.png'],
    category: 'Personal Care',
    stock: 80,
    featured: false,
    bestseller: true,
  },
  {
    id: 'p3',
    slug: 'arrowroot-powder',
    name: 'Arrowroot Powder',
    price: 1800,
    originalPrice: 2500,
    description: 'Fine arrowroot powder for cooking and skin — gluten-free and natural.',
    shortDescription: 'Pure arrowroot powder — multi-purpose',
    images: ['/assets/images/arrowrootpowder.png'],
    category: 'Food & Kitchen',
    stock: 200,
    featured: false,
    bestseller: false,
    gramPricing: true,
  },
]

export default products
