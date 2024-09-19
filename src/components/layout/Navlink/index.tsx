'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NavlinkProps } from './types'

const Navlink = ({
  name,
  path,
  icon
}: NavlinkProps) => {
  const isActive = usePathname() === path

  return (
    <Link
      className={`flex items-center gap-2 text-xs hover:text-black dark:hover:text-white
      dark:text-neutral-400 px-6 capitalize  border-r-4 transition
      ${isActive ? 'border-blue-500 text-black dark:!text-white font-medium' : 'border-transparent text-neutral-600'}`}
      href={path}
    >
      <span className={`text-lg ${isActive ? 'text-black dark:text-white' : 'text-primary-alt'}`}>{icon}</span>
      {name}
    </Link>
  )
}

export default Navlink