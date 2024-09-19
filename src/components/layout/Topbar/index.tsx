import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  RiUser6Line,
  RiArrowDropDownLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiMenuLine
} from 'react-icons/ri'

import { TopBarProps } from './types'

const Topbar = ({
  openMenu
}: TopBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: session } = useSession()
  const { back, forward } = useRouter()

  const handleSignout = () => {
    setShowDropdown(false)
    signOut({ callbackUrl: `${window.location.origin}/login`})
  }

  return (
    <div className="fixed top-0 left-0 z-40 w-full h-14 bg-white dark:bg-dark border-b border-neutral-200
    dark:border-neutral-800 lg:pl-52">
      <div className="flex items-center h-full justify-between px-4 md:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          {/* ******** MENU & BRAND ******** */}
          <div className="flex items-center gap-3 lg:hidden sm:pr-4 sm:border-r border-neutral-200 dark:border-neutral-800">
            <button className="icon-btn text-primary-alt" onClick={openMenu}>
              <RiMenuLine />
            </button>

            <div className="text-lg font-extrabold">fyntrax.</div>
          </div>

          {/* ******** ARROW NAVIGATION ******** */}
          <div className="hidden sm:flex items-center gap-2">
            <button className='icon-btn !p-2 text-primary-alt text-sm' onClick={() => back()}>
              <RiArrowLeftLine />
            </button>
            
            <button className='icon-btn !p-2 text-primary-alt text-sm' onClick={() => forward()}>
              <RiArrowRightLine />
            </button>
          </div>
        </div>

        <div className="dropdown relative group">
          <div tabIndex={0} className="flex items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(true)}>
            <div className="relative w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center
            justify-center overflow-hidden">
              {session?.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.firstname}
                  fill
                />
              ) : 
              <span className="text-primary-alt">
              <RiUser6Line />
              </span>
              }
            </div>

            <div className="hidden sm:flex flex-col mr-3">
              <p className="capitalize text-xs font-medium">{session?.user.firstname}</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{session?.user.email}</p>
            </div>

            <span className="text-primary-alt">
              <RiArrowDropDownLine />
            </span>
          </div>

          {showDropdown && <div tabIndex={0} className="dropdown-content min-w-[150px] w-full right-0">
            <div className="mt-4 bg-border rounded-xl p-2 !backdrop-blur-lg">
              <button
                className='text-xs p-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 w-full text-left
                text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white rounded-lg font-medium'
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </button>
              
              <button
                className='text-xs p-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 w-full text-left
                text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white rounded-lg font-medium'
                onClick={handleSignout}
              >
                Logout
              </button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Topbar