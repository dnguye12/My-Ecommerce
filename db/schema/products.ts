import { relations } from 'drizzle-orm'
import {
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'
import { productCategories } from './product_categories'
import { books } from './product_books'
import { productCollections } from './product_collections'

export const productTypeEnum = pgEnum('product_type', ['generic', 'book'])

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text().notNull(),
    type: productTypeEnum('type').notNull().default('generic'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    imageUrl: text('image_url'),
    stock: integer('stock').notNull().default(0),

    salePrice: decimal('sale_price', { precision: 10, scale: 2 }),
    saleStartAst: timestamp('sale_starts_at'),
    saleEndsAt: timestamp('sale_ends_at'),
    salesCount: integer('sales_count').notNull().default(0),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  },
  (table) => [index('products_sales_count_idx').on(table.salesCount.desc(), table.createdAt.desc())]
)

export type Product = typeof products.$inferSelect

export const productsRelations = relations(products, ({ many, one }) => ({
  productCategories: many(productCategories),
  book: one(books),
  productCollections: many(productCollections)
}))
