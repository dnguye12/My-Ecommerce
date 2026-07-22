import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface NavbarLinkButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  label: string
  iconButton?: boolean
}
const NavbarLinkButton = forwardRef<HTMLButtonElement, NavbarLinkButtonProps>(
  ({ label, iconButton = false, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant='ghost'
        size={iconButton ? 'icon-lg' : 'lg'}
        className={cn(
          'h-14 px-3 py-4 text-white font-bold uppercase cursor-pointer hover:bg-black aria-expanded:bg-black hover:text-white! aria-expanded:text-white',
          className
        )}
        {...props}
      >
        {label}
      </Button>
    )
  }
)

NavbarLinkButton.displayName = 'NavbarLinkButton'

export default NavbarLinkButton
