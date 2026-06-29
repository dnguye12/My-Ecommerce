import ProductCard from '@/components/product-card/ProductCard'
import { db } from '@/db'
import { products } from '@/db/schema/products'

const ProductsPage = async () => {
  const fetchedProducts = await db.select().from(products).limit(10)

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>All Products</h1>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {fetchedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default ProductsPage
