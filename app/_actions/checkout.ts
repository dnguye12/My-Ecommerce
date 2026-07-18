'use server'

import { db } from '@/db'
import { orderItems, orders } from '@/db/schema'
import { SUPPORTED_CURRENCIES } from '@/lib/currency'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/store/cart-store'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function createCheckoutSession(
  items: CartItem[],
  currency: SUPPORTED_CURRENCIES = SUPPORTED_CURRENCIES.USD,
  exchangeRate: number = 1
) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [order] = await db
    .insert(orders)
    .values({
      userId,
      total: total.toFixed(2),
      currency: currency,
      exchangeRate: exchangeRate.toFixed(2)
    })
    .returning()

  await db.insert(orderItems).values(
    items.map((item) => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price.toFixed(2),
      priceCharged: (item.price * item.quantity * exchangeRate).toFixed(2)
    }))
  )

  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (appUrl == null) {
    throw new Error('NEXT_PUBLIC_APP_URL is not set')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((item) => ({
      price_data: {
        currency: currency ?? 'usd',
        product_data: { name: item.name, images: [item.imageUrl] },
        unit_amount: Math.round(item.price * exchangeRate * 100)
      },
      quantity: item.quantity
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: { orderId: order.id }
  })

  await db.update(orders).set({ stripeSessionId: session.id }).where(eq(orders.id, order.id))

  return { url: session.url }
}
