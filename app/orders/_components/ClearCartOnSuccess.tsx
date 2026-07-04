'use client'

import { useCartStore } from '@/providers/cart-store-provider'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const ClearCartOnSuccess = () => {
  const params = useSearchParams()
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (params.get('success') === 'true') {
      clearCart()
    }
  }, [clearCart, params])

  return null
}

export default ClearCartOnSuccess
