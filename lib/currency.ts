export enum SUPPORTED_CURRENCIES {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}

export const isSupportedCurrency = (value: string) => {
  return Object.values(SUPPORTED_CURRENCIES).includes(value as SUPPORTED_CURRENCIES)
}

const EXCHANGE_RATE_URL = 'https://v6.exchangerate-api.com/v6/'

const FALLBACK_RATES = {
  result: 'error',
  conversion_rates: {
    USD: 1
  }
}

export const getExchangeRates = async (
  currency: SUPPORTED_CURRENCIES = SUPPORTED_CURRENCIES.USD
) => {
  try {
    const res = await fetch(
      `${EXCHANGE_RATE_URL}/${process.env.EXCHANGE_RATE_API}/latest/${currency}`,
      {
        next: {
          revalidate: 60 * 60 * 12,
          tags: [`exchange-rates:${currency}`]
        }
      }
    )
    if (!res.ok) {
      throw new Error(`Exchange rate API failed: ${res.status}`)
    }

    return await res.json()
  } catch {
    return FALLBACK_RATES
  }
}

export const formatMoney = (
  amount: string,
  currency: SUPPORTED_CURRENCIES,
  exchangeRate: number = 1
): string => {
  return Intl.NumberFormat('en', {
    style: 'currency',
    currency
  }).format(Number(amount) * exchangeRate)
}

export const getCurrencySymbol = (currency: SUPPORTED_CURRENCIES) => {
  const parts = new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol'
  }).formatToParts(0)

  return parts.find((part) => part.type === 'currency')?.value ?? currency
}
