import Link from 'next/link'
import { Button } from '../ui/button'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import CartDrawer from './components/CartDrawer'
import CurrencySelector from './components/CurrencySelector'
import { getTranslations } from 'next-intl/server'
import LocaleSelector from './components/LocaleSelector'
import NavbarLinkButton from './components/NavbarLinkButton'
import VinylBoxButton from './components/VinylBoxButton'

const Navbar = async () => {
  const { userId } = await auth()
  const t = await getTranslations('Navbar')
  return (
    <header className='sticky top-0 bg-black z-50'>
      <div className='container mx-auto flex items-center justify-between'>
        <nav className='flex items-center gap-4 justify-between w-full'>
          <div className='flex items-center'>
            <Link href='/' className='text-xl font-bold text-white'>
              MyShop
            </Link>
            <div className='pl-5 pr-3'>
              <Link href='/products'>
                <NavbarLinkButton label={t('products')} />
                <NavbarLinkButton label={t('faq')} />
                <VinylBoxButton />
              </Link>
            </div>
          </div>
          <div className='flex items-center'>
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
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
