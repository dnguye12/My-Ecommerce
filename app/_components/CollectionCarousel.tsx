import { Collection } from '@/db/schema'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { getCollectionBySlug } from '@/db/queries/collections'
import ProductCard from '@/components/product-card/ProductCard'

interface CollectionCarouselProps {
  collection: Collection
}

const CollectionCarousel = async ({ collection }: CollectionCarouselProps) => {
  const allProducts = await getCollectionBySlug(collection.slug)

  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true
      }}
    >
      <h2 className='mb-8 text-3xl font-bold'>{collection.name}</h2>
      <CarouselContent>
        {allProducts?.productCollections.map((pc) => (
          <CarouselItem key={pc.productId} className='basis-1/4'>
            <div className='p-0.5'>
              <ProductCard product={pc.product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CollectionCarousel
