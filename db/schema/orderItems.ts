import { decimal, integer, pgTable, uuid } from 'drizzle-orm/pg-core'
import { orders } from './orders'
import { products } from './products'
import { relations } from 'drizzle-orm'

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  priceCharged: decimal('price_charged', { precision: 10, scale: 2 })
})

export type OrderItem = typeof orderItems.$inferSelect

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id]
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id]
  })
}))
