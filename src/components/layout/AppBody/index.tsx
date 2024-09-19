import { ReactNode, useEffect, useRef, memo } from 'react'
import { Sora } from 'next/font/google'

import { useThemeContext } from '@contexts/ThemeContext'
import { useNetworkStatus } from '@contexts/NetworkStatusContext'
import { useAlertContext } from '@contexts/AlertContext'

const sora = Sora({ subsets: ['latin'] })

const AppBody = ({ children }: { children: ReactNode}) => {
  const bodyRef = useRef<HTMLBodyElement>(null)
  const { theme } = useThemeContext()
  const { msg, setAlert, clearAlert } = useAlertContext()
  const { isOnline } = useNetworkStatus()

  // Theme.
  useEffect(() => {
    if (bodyRef && bodyRef.current) {
      if (theme === 'dark') {
        bodyRef.current.classList.add('dark')
      } else {
        bodyRef.current.classList.remove('dark')
      }
    }
  }, [theme])

  // Network.
  useEffect(() => {
    if (!isOnline) {
      setAlert({
        msg: 'No network connection.',
        type: 'error',
        show: true
      })
    } else {
      // Don't clear alert if it's not network related.
      if (msg.includes('network connection')) clearAlert()
    }
  }, [setAlert, isOnline, clearAlert, msg])

  return (
    <body ref={bodyRef} className={`${sora.className} scrollbar transition`}>
      {children}
    </body>
  )
}

export default memo(AppBody)
