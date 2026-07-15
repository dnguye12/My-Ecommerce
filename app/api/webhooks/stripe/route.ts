import { db } from '@/db'
import { orderItems, products } from '@/db/schema'
import { orders } from '@/db/schema/orders'
import { stripe } from '@/lib/stripe'
import { and, eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new NextResponse('Invalid signature', { status: 400 })
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata?.orderId
    if (orderId) {
      const updatedOrder = (
        await db
          .update(orders)
          .set({
            status: 'paid',
            updatedAt: new Date()
          })
          .where(and(eq(orders.id, orderId), eq(orders.status, 'pending')))
          .returning()
      )[0]

      if (updatedOrder == null) {
        return NextResponse.json({ received: true })
      }

      const updatedOrderItems = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, updatedOrder.id))

      if (updatedOrderItems.length > 0) {
        const updates = updatedOrderItems.map((item) =>
          db
            .update(products)
            .set({
              salesCount: sql`${products.salesCount} + ${item.quantity}`
            })
            .where(eq(products.id, item.productId))
        )

        await db.batch(updates as [(typeof updates)[number], ...Array<(typeof updates)[number]>])
      }
    }
  }

  return NextResponse.json({ received: true })
}
