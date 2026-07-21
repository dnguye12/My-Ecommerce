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
import NavbarLinkButton from './NavbarLinkButton'

const CurrencySelector = () => {
  const { currency, onChangeCurrency } = useStoreCurrency()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NavbarLinkButton label={getCurrencySymbol(currency)} iconButton />
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
