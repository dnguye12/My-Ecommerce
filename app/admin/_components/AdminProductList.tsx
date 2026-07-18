'use client'

import { deleteProduct } from '@/app/_actions/products'
import { Button } from '@/components/ui/button'
import { Product } from '@/db/schema'
import { formatMoney, SUPPORTED_CURRENCIES } from '@/lib/currency'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface AdminProductListProps {
  products: Product[]
}

const AdminProductList = ({ products }: AdminProductListProps) => {
  return (
    <div className='space-y-2'>
      {products.map((product) => (
        <div key={product.id} className='flex items-center gap-4 rounded-lg border p-3'>
          <div className='relative h-12 w-12 shrink-0'>
            <Image
              src={product.imageUrl!}
              alt={product.name}
              fill
              sizes='48px'
              className='rounded object-cover'
            />
          </div>
          <div className='flex-1'>
            <p className='font-medium'>{product.name}</p>
            <p className='text-sm text-muted-foreground'>
              {formatMoney(product.price, SUPPORTED_CURRENCIES.USD)} · {product.stock} in stock
            </p>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={async () => {
              await deleteProduct(product.id)
              toast.success('Deleted')
            }}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default AdminProductList
