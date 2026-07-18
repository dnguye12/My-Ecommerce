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
  stripeSessionId: text('stripe_session_id'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  totalCharged: decimal('total_charged', { precision: 10, scale: 2 }),
  status: OrderStatusEnum('status').default('pending').notNull(),
  currency: text('currency').notNull().default('USD'),
  exchangeRate: decimal('exchange_rate', { precision: 10, scale: 2 }).notNull().default('1'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export type Order = typeof orders.$inferSelect

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems)
}))
