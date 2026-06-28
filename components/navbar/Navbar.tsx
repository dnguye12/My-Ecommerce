import Link from 'next/link'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ShoppingCartIcon } from 'lucide-react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

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
          <Link href='/cart' className='relative'>
            <Button variant='ghost' size='icon'>
              <ShoppingCartIcon className='h-5 w-5' />
            </Button>
            {count > 0 && (
              <Badge className='absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center'>
                {count}
              </Badge>
            )}
          </Link>
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
        </nav>
      </div>
    </header>
  )
}

export default Navbar
