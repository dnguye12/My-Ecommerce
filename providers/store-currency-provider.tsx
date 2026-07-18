'use client'

import { isSupportedCurrency, SUPPORTED_CURRENCIES } from '@/lib/currency'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const STORE_CURRENCY_LOCALSTORAGE_KEY = 'store-currency'

type StoreCurrencyValue = {
  currency: SUPPORTED_CURRENCIES
  onChangeCurrency: (currency: SUPPORTED_CURRENCIES) => void
  exchangeRate: number
}

const StoreCurrencyContext = createContext<StoreCurrencyValue | undefined>(undefined)

interface StoreCurrencyProvider {
  children: ReactNode
  exchangeRates: any
}

export const StoreCurrencyProvider = ({ children, exchangeRates }: StoreCurrencyProvider) => {
  const [currency, setCurrency] = useState<SUPPORTED_CURRENCIES>(SUPPORTED_CURRENCIES.USD)

  useEffect(() => {
    const savedCurrency = localStorage.getItem(STORE_CURRENCY_LOCALSTORAGE_KEY)

    if (savedCurrency != null && isSupportedCurrency(savedCurrency)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrency(savedCurrency as SUPPORTED_CURRENCIES)
    }
  }, [])

  const handleChangeCurrency = useCallback((currency: SUPPORTED_CURRENCIES) => {
    setCurrency(currency)
    localStorage.setItem(STORE_CURRENCY_LOCALSTORAGE_KEY, currency)
  }, [])

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
