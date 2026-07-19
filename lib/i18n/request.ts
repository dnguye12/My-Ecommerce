import { getRequestConfig } from 'next-intl/server'
import { LOCALE_COOKIE_KEY, routing } from './routing'
import { hasLocale } from 'next-intl'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const saved = (await cookies()).get(LOCALE_COOKIE_KEY)?.value
  const locale = hasLocale(routing.locales, saved) ? saved : routing.defaultLocale

  const Navbar = (await import(`../../components/navbar/messages/${locale}.json`)).default
  return { locale, messages: { Navbar } }
})
