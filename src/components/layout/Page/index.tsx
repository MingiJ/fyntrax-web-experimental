// 'use client'
import { Analytics } from '@vercel/analytics/react'
import NextTopLoader from 'nextjs-toploader';


import FloatingNav from "@components/layout/FloatingNav"
import Sidebar from "@components/layout/Sidebar"
import Topbar from "@components/layout/Topbar"
import Alert from '@components/global/Alert'

const Page = ({
  menuOpen,
  setMenuOpen,
  children
}: any) => {

  return (
    <>
      <NextTopLoader
        color="#3038FF"
        />
      <Alert />
      <Topbar openMenu={() => setMenuOpen(true)} />
      <Sidebar open={menuOpen} close={() => setMenuOpen(false)} />
      <FloatingNav />
      <main
        className="pb-14 sm:pb-0 lg:pl-52 pt-14 min-h-screen"
        onClick={() => setMenuOpen(false)}
      >
        {children}
      </main>
      <Analytics />
    </>
  )
}

export default Page