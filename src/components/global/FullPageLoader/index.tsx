'use client'

import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const myCreatePortal = ReactDOM.createPortal as any

const FullPageLoader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted ? myCreatePortal(
    <div className='flex items-center justify-center fixed top-0 left-0 h-screen w-full z-[10000] bg-white dark:bg-dark'>
      <div className="border-2 border-neutral-200 dark:border-neutral-800
      !border-t-primary-alt rounded-full w-6 h-6 animate-spin" />
    </div>,
    document.querySelector('#loader')!) : null
}

export default FullPageLoader