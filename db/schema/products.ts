import { relations } from 'drizzle-orm'
import { decimal, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { productCategories } from './product_categories'
import { books } from './product_books'

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text().notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  stock: integer('stock').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export type Product = typeof products.$inferSelect

export const productsRelations = relations(products, ({ many, one }) => ({
  productCategories: many(productCategories),
  book: one(books)
}))
