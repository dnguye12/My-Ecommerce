import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { db } from '.'
import { products } from './schema/products'
import { books } from './schema/product_books'
import { categories } from './schema/categories'
import { productCategories } from './schema/product_categories'
import { eq } from 'drizzle-orm'
import { collections, productCollections } from './schema'

const generateFakeBookProduct = () => {
  return {
    name: faker.book.title(),
    price: faker.commerce.price({ min: 5, max: 200 }),
    imageUrl: faker.image.url(),
    salesCount: faker.number.int({ min: 0, max: 150 })
  }
}

const generateFakeBook = () => {
  return {
    author: faker.book.author(),
    genre: faker.book.genre(),
    description: faker.commerce.productDescription(),
    publishedDate: faker.date.past().toISOString().split('T')[0]
  }
}

const resetDatabase = async () => {
  await db.delete(products)
  await db.delete(categories).where(eq(categories.name, 'Book'))
  await db.delete(collections)
}

const seedBook = async () => {
  await resetDatabase()
  console.log('Seeding...')

  const insertedCollections = await db
    .insert(collections)
    .values([
      {
        name: 'Staff Picks',
        slug: 'staff-picks'
      },
      {
        name: 'Summer Reading',
        slug: 'summer-reading'
      }
    ])
    .returning()

  const insertedCategory = (
    await db
      .insert(categories)
      .values({
        name: 'Book'
      })
      .returning({
        id: categories.id
      })
  )[0]

  const helper = []
  for (let i = 1; i <= 50; i++) {
    helper.push({
      product: generateFakeBookProduct(),
      book: generateFakeBook()
    })
  }

  const insertedProducts = await db
    .insert(products)
    .values(helper.map((i) => i.product))
    .returning({ id: products.id })

  await db.insert(productCategories).values(
    insertedProducts.map((p) => ({
      productId: p.id,
      categoryId: insertedCategory.id
    }))
  )

  await db.insert(books).values(
    helper.map((i, idx) => ({
      ...i.book,
      productId: insertedProducts[idx].id
    }))
  )

  const collectionProducts = insertedCollections.flatMap((collection) => {
    const randomProducts = faker.helpers.arrayElements(insertedProducts, {
      min: 6,
      max: 8
    })

    return randomProducts.map((product, idx) => ({
      productId: product.id,
      collectionId: collection.id,
      position: idx
    }))
  })

  await db.insert(productCollections).values(collectionProducts)

  console.log('Finished seeding')
}

seedBook()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
