import { isAdmin } from '@/lib/roles'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const userIsAdmin = await isAdmin()
  if (!userIsAdmin) {
    notFound()
  }

  return <>{children}</>
}
