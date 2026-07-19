'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import CartCounterBadge from './CartCounterBadge'
import { ShoppingCartIcon } from 'lucide-react'
import { useCartStore } from '@/providers/cart-store-provider'
import { Separator } from '@/components/ui/separator'
import CartDrawerProductCard from './CartDrawerProductCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatMoney } from '@/lib/currency'
import { useStoreCurrency } from '@/providers/store-currency-provider'
import { useTranslations } from 'next-intl'

const CartDrawer = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations('CartDrawer')

  const items = useCartStore((store) => store.items)
  const total = useCartStore((state) => state.total)
  const { currency, exchangeRate } = useStoreCurrency()

  const handleCheckOut = () => {
    setOpen(false)
    router.push('/cart')
  }

  return (
    <Drawer direction='right' open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <ShoppingCartIcon />
          <CartCounterBadge />
        </Button>
      </DrawerTrigger>
      <DrawerContent className=' max-w-2xl'>
        <DrawerHeader>
          <DrawerTitle className='text-2xl font-semibold'>{t('title')}</DrawerTitle>
        </DrawerHeader>
        <Separator />
        <div className='flex-1 flex flex-col gap-4 p-4'>
          {items.map((item) => (
            <CartDrawerProductCard key={item.id} item={item} />
          ))}
        </div>
        <Separator />
        <DrawerFooter>
          <div className='flex justify-between text-lg font-semibold'>
            <span>{t('total')}</span>
            <span>{formatMoney(total().toString(), currency, exchangeRate)}</span>
          </div>
          <Button size={'lg'} onClick={handleCheckOut}>
            {t('checkout')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
