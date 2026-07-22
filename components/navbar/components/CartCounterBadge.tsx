'use client'

import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/providers/cart-store-provider'

const CartCounterBadge = () => {
  const count = useCartStore((store) => store.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <Badge
      variant={'secondary'}
      className='cursor-default absolute -right-1 -bottom-0.5 h-5 w-5 rounded-full p-0 flex items-center justify-center'
    >
      {count}
    </Badge>
  )
}

export default CartCounterBadge
