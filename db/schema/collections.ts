import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { productCollections } from './product_collections'

export const collections = pgTable('collections', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const collectionsRelations = relations(collections, ({ many }) => ({
  productCollections: many(productCollections)
}))

export type Collection = typeof collections.$inferSelect
