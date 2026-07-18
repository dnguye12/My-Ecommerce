'use client'

import { STORE_CURRENCY_COOKIE_KEY, SUPPORTED_CURRENCIES } from '@/lib/currency'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'

type StoreCurrencyValue = {
  currency: SUPPORTED_CURRENCIES
  onChangeCurrency: (currency: SUPPORTED_CURRENCIES) => void
  exchangeRate: number
}

const StoreCurrencyContext = createContext<StoreCurrencyValue | undefined>(undefined)

interface StoreCurrencyProvider {
  children: ReactNode
  exchangeRates: any
  initialCurrency: SUPPORTED_CURRENCIES
}

export const StoreCurrencyProvider = ({
  children,
  exchangeRates,
  initialCurrency
}: StoreCurrencyProvider) => {
  const [currency, setCurrency] = useState<SUPPORTED_CURRENCIES>(initialCurrency)
  const router = useRouter()

  const handleChangeCurrency = useCallback(
    (currency: SUPPORTED_CURRENCIES) => {
      setCurrency(currency)
      document.cookie = `${STORE_CURRENCY_COOKIE_KEY}=${currency}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
      router.refresh()
    },
    [router]
  )

  const value: StoreCurrencyValue = useMemo(() => {
    const exchangeRate = exchangeRates.conversion_rates[currency]
    return {
      currency,
      onChangeCurrency: handleChangeCurrency,
      exchangeRate
    }
  }, [currency, exchangeRates.conversion_rates, handleChangeCurrency])

  return <StoreCurrencyContext.Provider value={value}>{children}</StoreCurrencyContext.Provider>
}

export const useStoreCurrency = () => {
  const storeCurrencyContext = useContext(StoreCurrencyContext)

  if (storeCurrencyContext == null) {
    throw new Error(`useStoreCurrency must be used within StoreCurrencyProvider`)
  }

  return storeCurrencyContext
}
