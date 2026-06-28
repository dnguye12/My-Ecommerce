import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Product } from '@/db/schema/products'

type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartActions = {
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  getItem: (id: string) => CartItem | undefined
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export type CartStore = CartState & CartActions

const defaultInitState: CartState = {
  items: []
}

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        addItem: (item: CartItem) => {
          set((state) => {
            const existing = state.items.find((i) => i.id === item.id)

            if (existing) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id
                    ? { ...item, quantity: i.quantity + Math.max(item.quantity, 1) }
                    : i
                )
              }
            } else {
              return {
                items: [...state.items, { ...item, quantity: 1 }]
              }
            }
          })
        },
        removeItem: (id: string) => {
          set((state) => {
            return {
              items: state.items.filter((i) => i.id !== id)
            }
          })
        },
        getItem: (id: string) => {
          return get().items.find((item) => item.id === id)
        },
        updateQuantity: (id: string, quantity: number) => {
          set((state) => ({
            items: state.items.map((i) => (i.id === id ? { ...i, quantity: quantity } : i))
          }))
        },
        clearCart: () => {
          set(() => ({ items: [] }))
        },
        total: () => {
          return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
}

export const mapProductToCartItem = (product: Product): CartItem => {
  return {
    id: product.id,
    name: product.name,
    price: parseFloat(product.price),
    imageUrl: product.imageUrl ?? '',
    quantity: product.stock
  }
}
