import Link from 'next/link'
import { RiCopyrightLine, RiMoonLine, RiSunLine } from 'react-icons/ri'

import DemoAccountLogin from '@components/signup/DemoAccountLogin'

import { useThemeContext } from '@contexts/ThemeContext'

const AuthWall = () => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen flex flex-col items-center justify-center gap-6
      bg-white dark:bg-neutral-900 text-center p-5">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold">Please log in to continue</h2>
          <p className='text-sm xl:text-base text-neutral-600 dark:text-neutral-400'>
            Log into your account to continue using Fyntrax.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            <DemoAccountLogin />

            <Link href='/login' className='btn'>
              Login
            </Link>
          </div>

          <p className="text-xs text-neutral-500">
            Don&apos;t have an account? <Link href='/signup' className="text-primary-alt">Sign up</Link>
          </p>
        </div>

        <div className="absolute bottom-8 space-y-6">
          <div className="flex items-center gap-5">
            <Link href='#' className="text-xs text-primary-alt hover:text-primary transition">Privacy Policy</Link>
            <Link href='#' className="text-xs text-primary-alt hover:text-primary transition">About</Link>
            <Link href='#' className="text-xs text-primary-alt hover:text-primary transition">Help</Link>
          </div>

          <hr className='border-neutral-200 dark:border-neutral-800' />

          <div className="flex items-center justify-between gap-5">
            <div className="text-neutral-500 text-sm flex items-center gap-2 leading-none">
              <RiCopyrightLine className='text-lg leading-none' />
              Copyright {new Date().getFullYear()}
            </div>

            <button onClick={toggleTheme} className='icon-btn'>
              {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
            </button>
          </div>
        </div>
      </div>
  )
}

export default AuthWall