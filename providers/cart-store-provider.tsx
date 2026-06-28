'use client'

import { CartStore, createCartStore } from '@/store/cart-store'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useStore } from 'zustand'

type CartStoreApi = ReturnType<typeof createCartStore>

const CartStoreContext = createContext<CartStoreApi | undefined>(undefined)

interface CartStoreProviderProps {
  children: ReactNode
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  const [store] = useState(() => createCartStore())
  return <CartStoreContext.Provider value={store}>{children}</CartStoreContext.Provider>
}

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const cartStoreContext = useContext(CartStoreContext)

  if (cartStoreContext == null) {
    throw new Error(`useCartStore must be used within CartStoreProvider`)
  }

  return useStore(cartStoreContext, selector)
}
