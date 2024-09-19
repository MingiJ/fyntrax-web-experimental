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
import Breadcrumbs from './BreadCrumb'

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
    <div className="fixed top-0 left-0 z-40 w-full h-14 dark:bg-dark lg:pl-52">
      <div className="flex items-center h-full justify-between px-4 md:px-8 lg:px-10">
        <Breadcrumbs/>
        <div className="flex items-center gap-4">
          {/* ******** MENU & BRAND ******** */}
          <div className="flex items-center gap-3 lg:hidden sm:pr-4 sm:border-r border-neutral-200 dark:border-neutral-800">
            <button className="icon-btn text-primary-alt" onClick={openMenu}>
              <RiMenuLine />
            </button>

            <div className="text-lg font-extrabold">fyntrax.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
