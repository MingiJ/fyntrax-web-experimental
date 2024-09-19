import { KPICardAlt2Props } from "./types"

const KPICardAlt2 = ({
  name,
  amount,
  type,
  currency
}: KPICardAlt2Props) => {
  const [whole, decimal] = amount.toLocaleString().split('.')
  const selectColor = (type: string) => {
    if (type === 'income') {
      return 'text-green-500'
    }

    if (type === 'expense') {
      return 'text-red-500'
    }

    return 'text-primary-alt'
  }
  return (
    <div className="space-y-2">
      <p className='capitalize  text-sm'>{name}</p>
      <hr className="w-5 border-primary-alt" />
      <div className="flex gap-2">
        <div className="text-3xl font-extrabold">
          <span className={selectColor(type)}>{whole}</span>
          <span className="text-neutral-400 dark:text-neutral-600">.{decimal || '00'}</span>
        </div>
        <span className="text-[10px] uppercase text-primary-alt font-semibold pt-1">
          {currency}
        </span>
      </div>
      {/* <p className={`text-3xl font-extrabold ${selectColor(name)}`}>{amount}</p> */}
    </div>
  )
}

export default KPICardAlt2