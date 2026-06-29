import { eq } from 'drizzle-orm'
import { db } from '..'
import { products } from '../schema/products'

export const getProductById = (id: string) =>
  db.query.products.findFirst({
    where: eq(products.id, id),
    with: { book: true }
  })
