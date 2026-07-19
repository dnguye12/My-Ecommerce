'use client'

import { formatMoney } from '@/lib/currency'
import { useStoreCurrency } from '@/providers/store-currency-provider'
import { CartItem } from '@/store/cart-store'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface CartDrawerProductCardProps {
  item: CartItem
}

const CartDrawerProductCard = ({ item }: CartDrawerProductCardProps) => {
  const { currency, exchangeRate } = useStoreCurrency()
  const t = useTranslations('CartDrawer')

  return (
    <div className='flex items-center gap-4 rounded-lg border p-4'>
      <div className='overflow-hidden rounded-md aspect-square w-20 relative'>
        <Image src={item.imageUrl} alt={item.name} fill className='object-cover' />
      </div>
      <div className='flex-1'>
        <h3 className='font-medium'>{item.name}</h3>
        <p className='text-sm text-muted-foreground'>
          {t('qty')}: {item.quantity}
        </p>
      </div>
      <div className='text-right'>
        <p className='font-semibold'>
          {formatMoney(item.price.toFixed(2), currency, exchangeRate)}
        </p>
      </div>
    </div>
  )
}

export default CartDrawerProductCard
