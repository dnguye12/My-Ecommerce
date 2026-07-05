import { eq } from 'drizzle-orm'
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
