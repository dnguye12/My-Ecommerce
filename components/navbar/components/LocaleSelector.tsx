'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LOCALE_COOKIE_KEY, routing } from '@/lib/i18n/routing'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Locale = (typeof routing.locales)[number]

const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français'
}

const LocaleSelector = () => {
  const locale = useLocale()
  const router = useRouter()

  const [selectedLang, setSelectedLang] = useState(locale)

  useEffect(() => {
    document.cookie = `${LOCALE_COOKIE_KEY}=${selectedLang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    router.refresh()
  }, [router, selectedLang])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon-lg'} variant='ghost'>
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='min-w-20'>
        <DropdownMenuGroup>
          {routing.locales.map((lang) => (
            <DropdownMenuItem key={lang} onClick={() => setSelectedLang(lang)}>
              {localeLabels[lang]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleSelector
