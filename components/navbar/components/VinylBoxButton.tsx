import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'

const VinylBoxButton = async () => {
  const t = await getTranslations('Navbar')
  return (
    <Button
      variant={'ghost'}
      className='px-3 py-4 text-sm text-black bg-brand rounded-none font-bold uppercase cursor-pointer h-12 -skew-x-12 hover:bg-brand hover:text-black!'
    >
      {t('vinyl-box')}
    </Button>
  )
}

export default VinylBoxButton
