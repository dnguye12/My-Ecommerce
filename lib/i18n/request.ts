import { getRequestConfig } from 'next-intl/server'
import { LOCALE_COOKIE_KEY, routing } from './routing'
import { hasLocale } from 'next-intl'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const saved = (await cookies()).get(LOCALE_COOKIE_KEY)?.value
  const locale = hasLocale(routing.locales, saved) ? saved : routing.defaultLocale

  const messages = {
    Navbar: (await import(`../../components/navbar/messages/${locale}.json`)).default,
    CartDrawer: (await import(`../../components/navbar/components/messages/${locale}.json`))
      .default,
    ProductCard: (await import(`../../components/product-card/messages/${locale}.json`)).default,
    AddToCartButton: (await import(`../../components/add-to-cart-button/messages/${locale}.json`))
      .default,
    CartPage: (await import(`../../app/cart/messages/${locale}.json`)).default,
    ProductsPage: (await import(`../../app/products/messages/${locale}.json`)).default,
    ProductPage: (await import(`../../app/products/[productId]/messages/${locale}.json`)).default,
    OrderPage: (await import(`../../app/orders/messages/${locale}.json`)).default,
    CheckoutPage: (await import(`../../app/checkout/messages/${locale}.json`)).default
  }

  return { locale, messages }
})
