import { useState } from "react"

import KPICardAlt2 from "@components/global/KPICardAlt2"
import Loader from "@components/global/Loader"
import Dropdown from "@components/global/Dropdown"

import useMoneyStats from "@hooks/useMoneyStats"

const Stats = () => {
  const [currency, setCurrency] = useState({
    name: 'USD',
    value: 'usd'
  })

  const { loading: statsLoading, stats } = useMoneyStats(currency.value)

  // Handle currency.
  const handleCurrency = (name: string, option: any) => {
    setCurrency(option)
  }

  return (
    <div className="p-5 lg:p-8 border border-neutral-200 dark:border-neutral-800 rounded-2xl
    bg-neutral-50 dark:bg-neutral-900 space-y-5">
      {statsLoading ? <Loader withContainer /> :
      <>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8'>
          <KPICardAlt2
            name="balance"
            amount={stats?.totalAccountsBalance || 0}
            type=''
            currency={currency.name}
          />

          <hr className="lg:hidden border-neutral-200 dark:border-neutral-800" />

          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between lg:justify-end gap-8">
            <KPICardAlt2
              name='income'
              amount={stats?.txTotals.income || 0}
              type='income'
              currency={currency.name}
            />
            <KPICardAlt2
              name='expense'
              amount={stats?.txTotals.expense || 0}
              type='expense'
              currency={currency.name}
            />
          </div>
        </div>

        <Dropdown
          name="currency"
          active={currency.name}
          options={[
            {name: 'KES', value: 'kes'},
            {name: 'USD', value: 'usd'},
          ]}
          setOption={handleCurrency}
        />
      </>
      }
    </div>
  )
}

export default Stats