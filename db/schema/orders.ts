import { decimal, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'
import { relations } from 'drizzle-orm'
import { orderItems } from './orderItems'

export const OrderStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled'
])

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  stripeSessionId: text(''),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: OrderStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export type Order = typeof orders.$inferSelect

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems)
}))
