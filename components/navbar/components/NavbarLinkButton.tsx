import { Button } from '@/components/ui/button'

interface NavbarLinkButtonProps {
  label: string
}
const NavbarLinkButton = ({ label }: NavbarLinkButtonProps) => {
  return (
    <Button
      variant={'ghost'}
      className='px-4 py-3 text-sm text-white font-bold uppercase cursor-pointer hover:bg-black hover:text-white!'
    >
      {label}
    </Button>
  )
}

export default NavbarLinkButton
