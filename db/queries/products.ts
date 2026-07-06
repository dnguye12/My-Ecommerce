import { and, desc, eq, gte, isNotNull, isNull, lte, or, sql } from 'drizzle-orm'
import { db } from '..'
import { products } from '../schema/products'

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: { book: true }
  })
}

export const getProducts = async () => {
  return db.select().from(products).orderBy(products.createdAt)
}

export const isOnSaleNow = and(
  isNotNull(products.salePrice),
  or(isNull(products.saleStartAst), lte(products.saleStartAst, sql`now()`)),
  or(isNull(products.saleEndsAt), gte(products.saleEndsAt, sql`now()`))
)

export const getTopSellers = (limit = 10) => {
  db.query.products.findMany({
    orderBy: [desc(products.salesCount), desc(products.createdAt)],
    limit
  })
}

export const getOnSaleProducts = (limit = 20) => {
  db.query.products.findMany({
    where: isOnSaleNow,
    orderBy: [desc(products.updatedAt)],
    limit
  })
}

export const getNewArrivals = (limit = 10) => {
  db.query.products.findMany({
    orderBy: [desc(products.createdAt)],
    limit
  })
}
