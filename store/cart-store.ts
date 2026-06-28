import { createStore } from 'zustand/vanilla'

type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

type CartState = {
  items: Map<string, CartItem>
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
  items: new Map()
}

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()((set, get) => ({
    ...initState,
    addItem: (item: CartItem) => {
      set((state) => {
        const items = new Map(state.items)
        const existing = items.get(item.id)

        if (existing == null) {
          items.set(item.id, item)
        }
        return { items }
      })
    },
    removeItem: (id: string) => {
      set((state) => {
        const items = new Map(state.items)
        items.delete(id)
        return { items }
      })
    },
    getItem: (id: string) => {
      return get().items.get(id)
    },
    updateQuantity: (id: string, quantity: number) => {
      set((state) => {
        const items = new Map(state.items)
        const existing = items.get(id)

        if (existing != null) {
          items.set(id, { ...existing, quantity })
        }

        return { items }
      })
    },
    clearCart: () => {
      set(() => ({ items: new Map() }))
    },
    total: () => {
      return get()
        .items.values()
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  }))
}
