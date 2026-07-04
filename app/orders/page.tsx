import { Badge } from '@/components/ui/badge'
import { getUserOrders } from '@/db/queries/orders'
import { auth } from '@clerk/nextjs/server'
import ClearCartOnSuccess from './_components/ClearCartOnSuccess'

const OrderPage = async () => {
  const { userId } = await auth()
  const orders = await getUserOrders(userId!)

  return (
    <>
      <ClearCartOnSuccess />
      <main className='container mx-auto px-4 py-8'>
        <h1 className='mb-8 text-3xl font-bold'>My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className='space-y-4'>
            {orders.map((order) => (
              <div key={order.id} className='rounded-lg border p-6'>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Order #{order.id.slice(0, 8)}</p>
                    <p className='text-sm'> {new Date(order.createdAt).toLocaleDateString()} </p>
                  </div>
                  <Badge>{order.status}</Badge>
                </div>
                <div className='mt-4 space-y-2'>
                  {order.items.map((item) => (
                    <div key={item.id} className='flex justify-between text-sm'>
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                <p className='mt-4 text-right font-bold'> Total: ${order.total} </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default OrderPage
