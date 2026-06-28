import { integer, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { products } from './products'
import { categories } from './categories'
import { relations } from 'drizzle-orm'

export const productCategories = pgTable(
  'product_categories',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' })
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.productId, table.categoryId]
    })
  })
)

export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
  product: one(products, {
    fields: [productCategories.productId],
    references: [products.id]
  }),
  category: one(categories, {
    fields: [productCategories.categoryId],
    references: [categories.id]
  })
}))
