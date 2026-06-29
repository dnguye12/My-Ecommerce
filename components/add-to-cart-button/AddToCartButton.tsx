'use client'

import { useCartStore } from '@/providers/cart-store-provider'
import { Button } from '../ui/button'
import { Product } from '@/db/schema/products'
import { mapProductToCartItem } from '@/store/cart-store'
import { toast } from 'sonner'

interface AddToCartButtonProps {
  product: Product
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddItem = () => {
    addItem(mapProductToCartItem(product))
    toast.success('Added to cart')
  }
  return (
    <Button size={'lg'} onClick={handleAddItem}>
      Add to Cart
    </Button>
  )
}

export default AddToCartButton
