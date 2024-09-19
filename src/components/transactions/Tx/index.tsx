import Link from "next/link"
import { RiFileList3Line } from "react-icons/ri"

import { TxProps } from "./types"

const Tx = ({
  id,
  title,
  category,
  amount,
  type,
  currency,
  grandTotal
}: TxProps) => {
  const txTotal = grandTotal ?? amount
  let [whole, decimal] = txTotal.toLocaleString().split('.')
  decimal = decimal && decimal.length === 1 ? `${decimal}0` : decimal

  const selectColor = (type: string) => {
    if (type === 'income') {
      return 'text-green-500'
    }

    if (type === 'expense') {
      return 'text-red-600'
    }

    return 'text-primary'
  }

  return (
    <Link
      href={`/transactions/${id}`}
      className="pb-5 border-b border-neutral-200 dark:border-neutral-800 last:border-none
      flex items-center gap-4 sm:gap-5 group"
    >
      {/* *********** ICON *********** */}
      <div className="text-2xl text-primary-alt group-hover:text-black dark:group-hover:text-white
      transition">
        <RiFileList3Line />
      </div>

      {/* *********** CONTENT *********** */}
      <div className="flex-1 border-l border-neutral-200 group-hover:border-neutral-900 dark:border-neutral-800
      dark:group-hover:border-white transition pl-4 sm:pl-5 flex items-center justify-between">
        <div className="space-y-1.5">
          <p className="text-sm">{title}</p>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize
          py-1 px-2 rounded-full bg-border w-max">
            {(category && category.name) || 'General'}
          </div>
        </div>

        <div className="text-end">
          <div className="xs:text-lg font-bold">
            <span className={selectColor(type)}>{type === 'income' ? '+' : '-'} {whole}</span>
            <span className="text-neutral-400 dark:text-neutral-500">.{decimal || '00'}</span>
          </div>

          <p className="text-[10px] font-semibold text-primary dark:text-primary-alt uppercase">{currency}</p>
        </div>
      </div>
    </Link>
  )
}

export default Tx