import AddToCartButton from '@/components/add-to-cart-button/AddToCartButton'
import { getProductById } from '@/db/queries/products'
import { formatMoney } from '@/lib/currency'
import { getStoreCurrency } from '@/lib/currency.server'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const ProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params
  const product = await getProductById(productId)
  const { currency, exchangeRate } = await getStoreCurrency()

  if (product == null) {
    notFound()
  }

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='grid gap-8 md:grid-cols-2'>
        <div className='relative aspect-square'>
          <Image
            src={product.imageUrl ?? 'https://placehold.co/600x400'}
            alt={product.name}
            fill
            className='rounded-lg object-cover'
          />
        </div>
        <div>
          <h1 className='mt-2 text-3xl font-bold'>{product.name}</h1>
          <p className='mt-4 text-2xl font-bold'>
            {formatMoney(product.price, currency, exchangeRate)}
          </p>
          <p className='mt-2 text-sm'>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          {product.type === 'book' && product.book && (
            <div>
              <p className='mt-4 text-muted-foreground'>{product.book.description}</p>
              <p>{product.book.author}</p>
              <p>{product.book.genre}</p>
            </div>
          )}
          <div className='mt-6'>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
