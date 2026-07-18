'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { formatMoney } from '@/lib/currency'
import { useCartStore } from '@/providers/cart-store-provider'
import { useStoreCurrency } from '@/providers/store-currency-provider'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const CartPage = () => {
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const { currency, exchangeRate } = useStoreCurrency()

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Shopping Cart</h1>
      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='space-y-4 lg:col-span-2'>
          {items.map((item) => (
            <div key={item.id} className='flex gap-4 rounded-lg border p-4'>
              <div className='relative h-24 w-24 shrink-0'>
                <Image src={item.imageUrl} alt={item.name} fill className='rounded object-cover' />
              </div>
              <div className='flex flex-1 flex-col'>
                <h3 className='font-semibold'>{item.name}</h3>
                <p className='text-muted-foreground'>${item.price}</p>
                <div className='mt-auto flex items-center gap-2'>
                  <Input
                    type='number'
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className='w-20'
                  />
                  <Button variant='ghost' size='icon' onClick={() => removeItem(item.id)}>
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
              <div className='font-bold'> ${(item.price * item.quantity).toFixed(2)} </div>
            </div>
          ))}
        </div>
        <div className='h-fit rounded-lg border p-6'>
          <h2 className='text-xl font-bold'>Order Summary</h2> <Separator className='my-4' />
          <div className='flex justify-between'>
            <span>Subtotal</span>
            <span>{formatMoney(total().toString(), currency, exchangeRate)}</span>
          </div>
          <Separator className='my-4' />
          <Link href='/checkout'>
            <Button className='w-full' size='lg'>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default CartPage
