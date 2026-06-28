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

const CartDrawer = () => {
  const items = useCartStore((store) => store.items)
  const total = useCartStore((store) => store.total())

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon' className='relative'>
          <ShoppingCartIcon />
          <CartCounterBadge />
        </Button>
      </DrawerTrigger>
      <DrawerContent className=' max-w-2xl'>
        <DrawerHeader>
          <DrawerTitle className='text-2xl font-semibold'>Shopping Cart</DrawerTitle>
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
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button size={'lg'}>Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
