export interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  description: string
  shortDescription?: string
  images: string[]
  category?: string
  stock: number
  featured?: boolean
  bestseller?: boolean
}
