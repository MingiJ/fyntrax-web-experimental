import Link from "next/link"

import { AccountTabProps } from "./types"

import { getIcon } from "@utils/getIcon"
import { usePathname } from "next/navigation"

const AccountTab = ({
  id,
  name,
  number,
  provider
}: AccountTabProps) => {
  const isActive = usePathname()?.split('/').pop() === id

  return (
    <Link href={`/accounts/${id}`} className={`p-2 rounded-2xl hover:bg-neutral-200/50
    dark:hover:bg-neutral-800/50 flex items-center gap-4 ${isActive && 'bg-neutral-200/50 dark:bg-neutral-800/50'}`}>
      <div className={`flex items-center p-4 bg-border rounded-2xl text-2xl text-primary-alt
      ${isActive && 'text-black dark:text-white'}`}>
        {getIcon(provider)}
      </div>

      <div className="space-y-1">
        <h4 className={`text-sm font-medium ${isActive ? 'text-black dark:text-white': 'text-neutral-600 dark:text-neutral-400'}`}>{name}</h4>
        {number && <p className={`text-xs ${isActive ? 'text-neutral-500 dark:text-neutral-400': 'text-neutral-500 dark:text-neutral-500'}`}>{number}</p>}
      </div>
    </Link>
  )
}

export default AccountTab

