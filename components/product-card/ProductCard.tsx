'use client'

import Link from 'next/link'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Product } from '@/db/schema/products'
import Image from 'next/image'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault()
    console.log(product)
    toast.success('Added to cart')
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className='overflow-hidden p-0 gap-4'>
        <div className='relative aspect-square'>
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className='object-cover' />
          ) : (
            <Skeleton className='object-cover' />
          )}
        </div>
        <CardContent className='px-4 py-0'>
          <h3 className='font-semibold hover:underline'>{product.name}</h3>
          <p className='mt-2 text-lg font-bold'>${product.price}</p>
        </CardContent>
        <CardFooter className='p-4 pt-0'>
          <Button className='w-full' onClick={(e) => addItem(e, product)}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
