import { AdminProductForm } from './_components/AdminProductForm'
import AdminProductList from './_components/AdminProductList'
import { getProducts } from '@/db/queries/products'

const AdminPage = async () => {
  const products = await getProducts()
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Admin Dashboard</h1>
      <div className='grid gap-8 lg:grid-cols-2'>
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Add Product</h2>
          <AdminProductForm />
        </div>
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Products</h2>
          <AdminProductList products={products} />
        </div>
      </div>
    </main>
  )
}

export default AdminPage
