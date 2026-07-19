'use client'

import { useCartStore } from '@/providers/cart-store-provider'
import { Button } from '../ui/button'
import { Product } from '@/db/schema/products'
import { mapProductToCartItem } from '@/store/cart-store'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

interface AddToCartButtonProps {
  product: Product
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem)
  const t = useTranslations('AddToCartButton')

  const handleAddItem = () => {
    addItem(mapProductToCartItem(product))
    toast.success(t('added'))
  }
  return (
    <Button size={'lg'} onClick={handleAddItem}>
      {t('add-to-cart')}
    </Button>
  )
}

export default AddToCartButton
