import Link from 'next/link'

import { AccountCardProps } from '@components/accounts/AccountCard/types'

import { getIcon } from "@utils/getIcon"

const AccountCard2 = ({
  id,
  name,
  number,
  provider,
  balance,
  currency
}: AccountCardProps) => {
  return (
    <Link href={`/accounts/${id}`} className="pb-5 border-b border-neutral-200 dark:border-neutral-800 last:border-none last:pb-0 flex items-center gap-4 sm:gap-5">
      {/* *********** ICON *********** */}
      <div className="text-2xl text-primary-alt h-16 w-16 rounded-full flex
      items-center justify-center bg-neutral-100 dark:bg-neutral-900 border
      border-neutral-200 dark:border-neutral-800">
        {getIcon(provider)}
      </div>

      {/* *********** CONTENT *********** */}
      <div className="flex-1 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm">{name}</p>

          <div className="flex items-center">
            {number && <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
              {number}
            </p>}
          </div>
        </div>

        <div className="text-end">
          <div className="flex gap-2">
            <div className="xs:text-lg font-bold">
              <span className='text-primary-alt'>{balance.toLocaleString().split('.')[0]}</span>
              <span className="text-neutral-400">.{balance.toLocaleString().split('.')[1] || '00'}</span>
            </div>
          </div>

          <p className="text-[10px] font-semibold text-primary dark:text-primary-alt uppercase">
            {currency}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default AccountCard2