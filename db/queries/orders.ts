import { desc, eq } from 'drizzle-orm'
import { db } from '..'
import { orders } from '../schema'

export async function getUserOrders(userId: string) {
  return db.query.orders.findMany({
    where: eq(orders.userId, userId),
    orderBy: [desc(orders.createdAt)],
    with: {
      items: {
        with: { product: true }
      }
    }
  })
}
