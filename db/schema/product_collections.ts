import { index, integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { products } from './products'
import { collections } from './collections'
import { relations } from 'drizzle-orm'

export const productCollections = pgTable(
  'product_collections',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    collectionId: integer('collection_id')
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0)
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productId, table.collectionId]
    }),
    collectionIdIdx: index('product_collections_collection_position_idx').on(
      table.collectionId,
      table.position
    )
  })
)

export const productCollectionsRelations = relations(productCollections, ({ one }) => ({
  product: one(products, {
    fields: [productCollections.productId],
    references: [products.id]
  }),
  collections: one(collections, {
    fields: [productCollections.collectionId],
    references: [collections.id]
  })
}))
