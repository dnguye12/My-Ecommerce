'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/providers/cart-store-provider'
import { useState } from 'react'
import { createCheckoutSession } from '../_actions/checkout'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useStoreCurrency } from '@/providers/store-currency-provider'

const CheckoutPage = () => {
  const [loadingStripe, setLoadingStripe] = useState(false)

  const { isSignedIn, isLoaded } = useUser()
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const { currency, exchangeRate } = useStoreCurrency()

  const handleCheckout = async () => {
    setLoadingStripe(true)

    try {
      const { url } = await createCheckoutSession(items, currency, exchangeRate)
      if (url) {
        window.location.href = url
      }
    } catch {
      toast.error('Checkout failed')
      setLoadingStripe(false)
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <main className='container mx-auto max-w-2xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Checkout</h1>
      <div className='rounded-lg border p-6'>
        {items.map((item) => (
          <div key={item.id} className='flex justify-between py-2'>
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <Separator className='my-4' />
        <div className='flex justify-between font-bold'>
          <span>Total</span> <span>${total().toFixed(2)}</span>
        </div>
        {isSignedIn ? (
          <Button
            className='mt-6 w-full'
            size='lg'
            onClick={handleCheckout}
            disabled={loadingStripe || items.length === 0}
          >
            {loadingStripe ? 'Processing...' : 'Pay with Stripe'}
          </Button>
        ) : (
          <Button className='mt-6 w-full' size='lg' asChild>
            <Link href={'/sign-in?redirect_url=/checkout'}>Sign in to pay</Link>
          </Button>
        )}
      </div>
    </main>
  )
}

export default CheckoutPage
