import { defineRouting } from 'next-intl/routing'

export const LOCALE_COOKIE_KEY = 'store-locale'

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
})
