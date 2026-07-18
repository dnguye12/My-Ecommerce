import Link from 'next/link'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import CartDrawer from './components/CartDrawer'
import CurrencySelector from './components/CurrencySelector'

const Navbar = async () => {
  const count = 0
  const { userId } = await auth()
  return (
    <header className='border-b sticky top-0 bg-background z-50'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/' className='text-xl font-bold'>
          MyShop
        </Link>
        <nav className='flex items-center gap-4'>
          <Link href='/products'>
            <Button variant='ghost'>Products</Button>
          </Link>
          <CartDrawer />
          {userId ? (
            <>
              <Link href='/orders'>
                <Button variant='ghost'>Orders</Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href='/sign-in'>
                <Button>Sign In</Button>
              </Link>
            </>
          )}
          <CurrencySelector />
        </nav>
      </div>
    </header>
  )
}

export default Navbar
