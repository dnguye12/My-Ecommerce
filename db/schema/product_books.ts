import { date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { products } from './products'
import { relations } from 'drizzle-orm'

export const books = pgTable('books', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .unique()
    .references(() => products.id, {
      onDelete: 'cascade'
    }),
  author: text('author').notNull(),
  genre: text('genre').notNull(),
  description: text('description'),
  publishedDate: date('published_date')
})

export type Book = typeof books.$inferSelect

export const booksRelations = relations(books, ({ one }) => ({
  product: one(products, {
    fields: [books.productId],
    references: [products.id]
  })
}))
