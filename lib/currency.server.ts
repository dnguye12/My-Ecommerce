import 'server-only'
import { cookies } from 'next/headers'
import {
  getExchangeRates,
  isSupportedCurrency,
  STORE_CURRENCY_COOKIE_KEY,
  SUPPORTED_CURRENCIES
} from './currency'

export const getStoreCurrency = async () => {
  const saved = (await cookies()).get(STORE_CURRENCY_COOKIE_KEY)?.value
  const currency =
    saved != null && isSupportedCurrency(saved)
      ? (saved as SUPPORTED_CURRENCIES)
      : SUPPORTED_CURRENCIES.USD

  const exchangeRates = await getExchangeRates()
  const exchangeRate = exchangeRates.conversion_rates[currency] ?? 1

  return { currency, exchangeRate }
}
