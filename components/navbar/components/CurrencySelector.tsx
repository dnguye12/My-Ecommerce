'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getCurrencySymbol, SUPPORTED_CURRENCIES } from '@/lib/currency'
import { useStoreCurrency } from '@/providers/store-currency-provider'

const CurrencySelector = () => {
  const { currency, onChangeCurrency } = useStoreCurrency()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon-lg'} variant='ghost'>
          {getCurrencySymbol(currency)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='min-w-20'>
        <DropdownMenuGroup>
          {Object.values(SUPPORTED_CURRENCIES).map((curr) => (
            <DropdownMenuItem
              key={curr}
              onClick={() => {
                onChangeCurrency(curr)
              }}
            >
              {curr} - {getCurrencySymbol(curr)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrencySelector
