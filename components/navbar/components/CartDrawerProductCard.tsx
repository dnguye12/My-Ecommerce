import { CartItem } from '@/store/cart-store'
import Image from 'next/image'

interface CartDrawerProductCardProps {
  item: CartItem
}

const CartDrawerProductCard = ({ item }: CartDrawerProductCardProps) => {
  return (
    <div className='flex items-center gap-4 rounded-lg border p-4'>
      <div className='overflow-hidden rounded-md aspect-square w-20 relative'>
        <Image src={item.imageUrl} alt={item.name} fill className='object-cover' />
      </div>
      <div className='flex-1'>
        <h3 className='font-medium'>{item.name}</h3>
        <p className='text-sm text-muted-foreground'>Qty: {item.quantity}</p>
      </div>
      <div className='text-right'>
        <p className='font-semibold'>${item.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CartDrawerProductCard
