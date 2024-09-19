import { RiArrowDownLine, RiArrowUpLine, RiAsterisk } from "react-icons/ri"

import { KPICardAltProps } from "./types"

const KPICardAlt = ({
  show,
  name,
  amount,
  type,
  currency
}: KPICardAltProps) => {
  const [whole, decimal] = amount.toLocaleString().split('.')

  const selectColor = (type: string) => {
    if (type === 'income') {
      return 'text-green-500'
    }

    if (type === 'expense') {
      return 'text-red-500'
    }

    return 'text-primary'
  }

  return (
    <div className="p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50
    dark:bg-neutral-900 space-y-4">
      <div className="text-2xl sm:text-3xl font-bold">
        {show ? (
          <>
            <div className="flex gap-2">
              <div className="">
                <span className={selectColor(type)}>{whole}</span>
                <span className="text-neutral-400 dark:text-neutral-600">.{decimal || '00'}</span>
              </div>
              <span className="text-xs uppercase text-primary-alt font-semibold pt-1">
                {currency}
              </span>
            </div>
            {/* <span className={selectColor(type)}>{whole}</span>
            <span className="text-neutral-400 dark:text-neutral-600">.{(decimal && decimal.length === 1 && `${decimal}0`) || '00'}</span> */}
          </>
        ) : (
          <div className="flex gap-1 h-9 text-primary-alt text-sm">
            <RiAsterisk />
            <RiAsterisk />
            <RiAsterisk />
          </div>
        )}
      </div>
      
      <hr className="w-10 border-primary-alt/50" />

      <div className="flex justify-between">
        <p className="capitalize font-semibold">{name}</p>

        <div className="flex items-center gap-1 text-primary-alt">
          {type === 'income' ? 
            <span className="text-lg">
              <RiArrowDownLine />
            </span>
            :
            <span className="text-lg">
              <RiArrowUpLine />
            </span>
          }

          {/* <span className="text-sm">5%</span> */}
        </div>
      </div>
    </div>
  )
}

export default KPICardAlt