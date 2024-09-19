import { useEffect, useState } from "react"
import {
  RiArrowDropDownLine,
  RiAsterisk,
  RiEyeLine,
  RiEyeOffLine
} from "react-icons/ri"

import KPICardAlt from "@components/global/KPICardAlt"
import Loader from "@components/global/Loader"
import Dropdown from "@components/global/Dropdown"

import useMoneyStats from "@hooks/useMoneyStats"
import useCurrencies from "@hooks/useCurrencies"

import { IAccount } from "@utils/interfaces"

import { useFigureDisplayContext } from "@contexts/FigureDisplayContext"

const StatsOverview = () => {
  const [currency, setCurrency] = useState({
    name: '',
    value: ''
  })
  const [account, setAccount] = useState({
    name: 'All Accounts',
    value: '',
    balance: 0,
    transactions: {
      income: 0,
      expense: 0,
    }
  })

  // Get money stats.
  const { loading, stats } = useMoneyStats(currency.value)

  // Get figures display state.
  const { showFigures, toggleFigureDisplay } = useFigureDisplayContext()

  // Get user currencies.
  const { defaultCurrency, currencies } = useCurrencies()

  // Set account stats.
  useEffect(() => {
    if (stats && !loading) {
      setAccount(prev => ({
        ...prev,
        balance: stats.totalAccountsBalance,
        transactions: {
          income: stats.txTotals.income,
          expense: stats.txTotals.expense
        }
      }))
    }
  }, [stats, loading])

  // Set currency state to default currency.
  useEffect(() => {
    if (defaultCurrency) {
      setCurrency({
        name: defaultCurrency.toUpperCase(),
        value: defaultCurrency
      })
    }
  }, [defaultCurrency])

  // Handle currency.
  const handleCurrency = (name: string, option: any) => {
    setCurrency(option)
    handleAccount('', { value: ''})
  }

  // Handle account.
  const handleAccount = (name: string, option: any) => {
    if (!option.value) {
      setAccount(prev => ({
        ...prev,
        name: 'All Accounts',
        balance: stats.totalAccountsBalance,
        transactions: {
          income: stats.txTotals.income,
          expense: stats.txTotals.expense
        }
      }))
      return;
    }
    setAccount(prev => {
      const acc = stats.accounts.find((ac: IAccount) => ac.name === option.value)

      return {
        ...prev,
        ...acc,
      }
    })
  }

  return (
    <div className="space-y-4">
      {loading ? <Loader withContainer /> :
        <>
          {/* *********** BALANCE *********** */}
          <div className="p-4 sm:p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50
          dark:bg-neutral-900 space-y-4">
            <>
              <div className="flex justify-between">
                <div className="text-2xl sm:text-3xl font-bold">
                  {showFigures ? (
                    <div className="flex gap-2">
                      <div className="">
                        <span className="text-primary dark:text-primary-alt">{account.balance.toLocaleString().split('.')[0]}</span>
                        <span className="text-neutral-400 dark:text-neutral-600">.{account.balance.toLocaleString().split('.')[1] || '00'}</span>
                      </div>
                      <span className="text-xs uppercase text-primary-alt font-semibold pt-1">
                        {currency.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-1 h-6 text-primary-alt text-sm">
                      <RiAsterisk />
                      <RiAsterisk />
                      <RiAsterisk />
                    </div>
                  )}
                </div>

                <button
                  className="icon-btn text-primary-alt"
                  onClick={() => toggleFigureDisplay()}
                >
                  {showFigures ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>

              <hr className="w-10 border-primary-alt/50" />

              <div className="space-y-2">
                <p className="capitalize font-semibold">your balance</p>

                <div className="flex items-center gap-2">
                  {/* <div className="flex items-center gap-2">
                    <p className="text-xs capitalize text-neutral-500">all accounts</p>

                    <span className="text-primary-alt">
                      <RiArrowDropDownLine />
                    </span>
                  </div> */}
                  
                  <Dropdown
                    name="account"
                    active={account.name}
                    options={stats?.accounts.map((acc: IAccount) => ({ name: acc.name, value: acc.name })) || []}
                    setOption={handleAccount}
                  />
                  
                  <Dropdown
                    name="currency"
                    active={currency.name}
                    options={currencies.map((curr: string) => ({ name: curr.toUpperCase(), value: curr }))}
                    setOption={handleCurrency}
                  />
                </div>
              </div>
            </>
          </div>

          {/* *********** INCOME & EXPENSES *********** */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <KPICardAlt
              name="income"
              amount={account.transactions.income}
              show={showFigures}
              type='income'
              currency={currency.name}
            />
            
            <KPICardAlt
              name="expenses"
              amount={account.transactions.expense}
              show={showFigures}
              type='expense'
              currency={currency.name}
            />
          </div>
        </>
      }
    </div>
  )
}

export default StatsOverview