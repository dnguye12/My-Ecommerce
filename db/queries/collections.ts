import { asc, eq } from 'drizzle-orm'
import { db } from '..'
import { collections, productCollections } from '../schema'

export const getCollections = () => {
  db.query.collections.findMany({
    orderBy: [asc(collections.name)]
  })
}

export const getCollectionBySlug = (slug: string) => {
  db.query.collections.findFirst({
    where: eq(collections.slug, slug),
    with: {
      productCollections: {
        orderBy: [asc(productCollections.position)],
        with: {
          product: true
        }
      }
    }
  })
}
