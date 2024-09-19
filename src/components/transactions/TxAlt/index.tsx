import { format } from "date-fns"
import Link from "next/link"
import { RiArrowDownLine, RiArrowUpLine, RiFileList3Line } from "react-icons/ri"

import { TxAltProps } from "./types"

const TxAlt = ({
  id,
  title,
  category,
  amount,
  type,
  date,
  currency,
  grandTotal
}: TxAltProps) => {
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

  const selectIcon = (type: string) => {
    if (type === 'expense') {
      return <RiArrowUpLine />
    }
    
    if (type === 'income') {
      return <RiArrowDownLine />
    }

  }

  return (
    <Link
      href={`/transactions/${id}`}
      className="pb-5 border-b border-neutral-200 hover:border-neutral-900 transition dark:border-neutral-800 
      dark:hover:border-white last:border-none last:pb-0 flex items-center gap-4 sm:gap-5 group"
    >
      {/* *********** ICON *********** */}
      <div className="text-2xl text-primary-alt h-16 w-16 rounded-full flex
      items-center justify-center bg-neutral-100 dark:bg-neutral-900 border
      border-neutral-200 dark:border-neutral-800 group-hover:text-black
      dark:group-hover:text-white transition">
        <RiFileList3Line />
      </div>

      {/* *********** CONTENT *********** */}
      <div className="flex-1 flex items-center justify-between">
        <div className="space-y-1">
          {/* *********** TITLE *********** */}
          <p className="text-sm">{title}</p>

          <div className="flex items-center gap-3">
            {/* *********** DATE *********** */}
            {date && <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
              {format(new Date(date), 'MMM dd, yyy')}
            </p>}

            {/* *********** CATEGORY *********** */}
            {category && (
              <>
                <div className="h-4 border-r border-neutral-200 dark:border-neutral-700"></div>
                
                <div className="text-xs text-neutral-500 dark:text-neutral-400 capitalize
                py-1 px-2 rounded-full bg-border">
                  {category.name}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* *********** AMOUNT *********** */}
        <div className="text-end">
          <div className="flex gap-2">
            <div className={`${selectColor(type)} text-xs mt-1`}>
              {selectIcon(type)}
            </div>

            <div className="xs:text-lg font-bold">
              <span className={selectColor(type)}>{whole}</span>
              <span className="text-neutral-400">.{decimal || '00'}</span>
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

export default TxAlt