import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { db } from '.'
import { products } from './schema/products'
import { books } from './schema/product_books'
import { categories } from './schema/categories'
import { productCategories } from './schema/product_categories'
import { eq } from 'drizzle-orm'

const generateFakeBookProduct = () => {
  return {
    name: faker.book.title(),
    price: faker.commerce.price({ min: 5, max: 200 }),
    imageUrl: faker.image.url()
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
}

const seedBook = async () => {
  await resetDatabase()
  console.log('Seeding...')

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

  console.log('Finished seeding')
}

seedBook()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
