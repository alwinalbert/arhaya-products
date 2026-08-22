import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import products from '../data/products'

type CartItem = { productId: string; quantity: number }

type CartState = {
  items: CartItem[]
  addItem: (productId: string, qty?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, qty: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],
      addItem: (productId: string, qty = 1) => {
        const items = get().items.slice()
        const idx = items.findIndex((i: CartItem) => i.productId === productId)
        if (idx > -1) {
          items[idx].quantity += qty
        } else {
          items.push({ productId, quantity: qty })
        }
        set({ items })
      },
      removeItem: (productId: string) =>
        set({ items: get().items.filter((i: CartItem) => i.productId !== productId) }),
      updateQuantity: (productId: string, qty: number) => {
        const items = get().items.slice()
        const idx = items.findIndex((i: CartItem) => i.productId === productId)
        if (idx > -1) {
          items[idx].quantity = qty
          if (items[idx].quantity <= 0) items.splice(idx, 1)
        }
        set({ items })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const items = get().items
        let total = 0
        items.forEach((it: CartItem) => {
          const p = products.find((p) => p.id === it.productId)
          if (p) total += p.price * it.quantity
        })
        return total
      },
      getItemCount: () => get().items.reduce((s: number, i: CartItem) => s + i.quantity, 0),
    }),
    { name: 'arhaya_cart' }
  )
)

export type { CartItem }
