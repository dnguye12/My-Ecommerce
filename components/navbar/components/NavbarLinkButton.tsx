import { Button } from '@/components/ui/button'

interface NavbarLinkButtonProps {
  label: string
}
const NavbarLinkButton = ({ label }: NavbarLinkButtonProps) => {
  return (
    <Button
      variant={'ghost'}
      className='px-3 py-4 text-sm text-white font-bold uppercase cursor-pointer h-12 hover:bg-black hover:text-white!'
    >
      {label}
    </Button>
  )
}

export default NavbarLinkButton
