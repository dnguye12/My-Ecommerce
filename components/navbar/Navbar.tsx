import Link from 'next/link'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import CartDrawer from './components/CartDrawer'
import CurrencySelector from './components/CurrencySelector'
import { getTranslations } from 'next-intl/server'
import LocaleSelector from './components/LocaleSelector'

const Navbar = async () => {
  const { userId } = await auth()
  const t = await getTranslations('Navbar')
  return (
    <header className='border-b sticky top-0 bg-background z-50'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link href='/' className='text-xl font-bold'>
          MyShop
        </Link>
        <nav className='flex items-center gap-4'>
          <Link href='/products'>
            <Button variant='ghost'>{t('products')}</Button>
          </Link>
          <CartDrawer />
          {userId ? (
            <>
              <Link href='/orders'>
                <Button variant='ghost'>{t('orders')}</Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href='/sign-in'>
                <Button>{t('sign-in')}</Button>
              </Link>
            </>
          )}
          <CurrencySelector />
          <LocaleSelector />
        </nav>
      </div>
    </header>
  )
}

export default Navbar
