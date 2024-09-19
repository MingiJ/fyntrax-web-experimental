'use client'
import { useContext, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { RiCopyrightLine, RiMoonLine, RiSunLine } from "react-icons/ri"

import Brand from "@components/global/Brand"
import { OnboardingLayoutProps } from '@components/onboarding/OnboardingLayout/types'

import { useThemeContext } from "@contexts/ThemeContext"

const OnboardingLayout = ({ layoutChildren }: OnboardingLayoutProps) => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-full bg-white dark:bg-dark
    grid grid-cols-1 xl:grid-cols-2">
      <div className="p-5 sm:p-10 md:p-14 flex flex-col gap-16 lg:gap-10 justify-between overflow-auto
      scrollbar">
        <Brand horizontal />

        {layoutChildren}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <Link href='#' className="text-xs text-primary-alt hover:text-primary transition">Privacy Policy</Link>
            <Link href='#' className="text-xs text-primary-alt hover:text-primary transition">About</Link>
            <Link href='#' className="text-xs text-primary-alt hover:text-primary transition">Help</Link>
          </div>


          <div className="flex items-center gap-5">
            <div className="text-neutral-500 text-xs flex items-center gap-2 leading-none">
              <RiCopyrightLine className='text-base leading-none' />
              Copyright {new Date().getFullYear()}
            </div>

            <button onClick={toggleTheme} className='icon-btn'>
              {theme === 'light' ? <RiMoonLine /> : <RiSunLine />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex bg-neutral-100 dark:bg-neutral-900
      items-center">
        {theme === 'light' ? (
          <Image
            className='absolute right-0 object-cover'
            src='/dashboard-light.png'
            width={702}
            height={329}
            alt=''
          />
        ) : (
          <Image
            className='absolute right-0 object-cover'
            src='/dashboard-dark.png'
            width={652}
            height={279}
            alt=''
          />
        )}
      </div>
    </div>
  )
}

export default OnboardingLayout