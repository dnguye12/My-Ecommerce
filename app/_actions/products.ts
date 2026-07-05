'use server'

import { db } from '@/db'
import { products } from '@/db/schema'
import { isAdmin } from '@/lib/roles'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import * as z from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  price: z.string().min(1, 'Required'),
  imageUrl: z.string().url('Upload an image'),
  category: z.string().min(1, 'Required'),
  stock: z.coerce.number<number>().int().min(0)
})

export const createProduct = async (data: z.infer<typeof productSchema>) => {
  if (!(await isAdmin())) {
    throw new Error('Unauthorized')
  }
  const parsed = productSchema.parse(data)
  await db.insert(products).values(parsed)
  revalidatePath('/admin')
  revalidatePath('/products')
}

export async function deleteProduct(id: string) {
  if (!(await isAdmin())) {
    throw new Error('Unauthorized')
  }
  await db.delete(products).where(eq(products.id, id))
  revalidatePath('/admin')
  revalidatePath('/products')
}
