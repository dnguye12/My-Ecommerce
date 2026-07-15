import { db } from '@/db'
import { collections } from '@/db/schema'
import CollectionCarousel from './_components/CollectionCarousel'

export default async function Home() {
  const allCollections = await db.select().from(collections)

  return (
    <main className='container mx-auto p-8'>
      <div className='flex flex-col gap-6'>
        {allCollections.map((c) => (
          <CollectionCarousel key={c.id} collection={c} />
        ))}
      </div>
    </main>
  )
}
