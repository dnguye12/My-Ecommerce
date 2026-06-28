import ProductCard from '@/components/product-card/ProductCard'
import { db } from '@/db'
import { products } from '@/db/schema/products'

export default async function Home() {
  const placeholder = await db.select().from(products).limit(4)

  return (
    <main className='container mx-auto p-8'>
      <h1 className='mb-8 text-3xl font-bold'>Featured Products</h1>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {placeholder.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
