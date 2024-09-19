'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

import Page from '@components/layout/Page'
import AuthWall from '@components/global/AuthWall'
import FullPageLoader from '@components/global/FullPageLoader'

import '../../styles/globals.css'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { status } = useSession()

  if (status === 'loading') {
    return <FullPageLoader />
  }

  if (status === 'unauthenticated') {
    return <AuthWall/>
  }

  return (
    <Page menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      {children}
    </Page>
  )
}
