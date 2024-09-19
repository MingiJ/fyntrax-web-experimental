'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { RiArrowDropDownLine, RiArrowRightLine } from 'react-icons/ri'

import Modal from '@components/global/Modal'
import Search from '@components/global/Search'
import CurrencyOption from '@components/onboarding/CurrencyOption'
import Info from '@components/global/Info'

import { useOnboardingContext } from '@contexts/OnboardingContext'

const ChooseCurrency = () => {
  const { currency, setCurrency: handleSetCurrency } = useOnboardingContext()

  const [query, setQuery] = useState('')
  const [currencies, setCurrencies] = useState([
    { sign: 'kes', name: 'kenyan shilling' },
    { sign: 'usd', name: 'united states dollar' },
    { sign: 'eur', name: 'euro' },
    { sign: 'gbp', name: 'great british pound' },
  ])

  const handleQueryChange = (q: string) => {
    setQuery(q)

    if (!q.trim().length) {
      setCurrencies([
        { sign: 'kes', name: 'kenyan shilling' },
        { sign: 'usd', name: 'united states dollar' },
        { sign: 'eur', name: 'euro' },
        { sign: 'gbp', name: 'great british pound' },
      ])
      return
    }

    const filteredCurrencies = currencies.filter(curr => curr.name.toLowerCase().includes(query.toLowerCase()) || curr.sign.toLowerCase().includes(q.toLowerCase()))
    setCurrencies([...filteredCurrencies])
  }

  const handleCurrencySearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const selectCurrency = (currency: any) => {
    handleSetCurrency(currency)
  }
  
  return (
    <div className="space-y-10">
      {/* ******** HEADER ******** */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-bold capitalize">
          Choose your currency
        </h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Please select the currency you&apos;ll be using on Fyntrax. You can always change it or add more later.
        </p>
      </div>

      <div className="">
        <Modal
          renderOpener={(openModal: any) => (
            <button
              className="input flex items-center justify-between !outline-none"
              onClick={openModal}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-primary-alt font-bold uppercase">{currency.sign}</span>
                <div className="h-4 border border-neutral-200 w-px dark:border-neutral-800"></div>
                <p className="text-sm capitalize">{currency.name}</p>
              </div>

              <RiArrowDropDownLine className='text-primary-alt' />
            </button>
          )}

          renderChildren={(closeModal: any) => (
            <div className="space-y-5">
              <div className="space-y-5">
                <h2 className="text-xl font-bold">Select currency</h2>

                <Search
                  placeholder='Search currencies...'
                  query={query}
                  setQuery={handleQueryChange}
                  handleSearch={handleCurrencySearch}
                />
              </div>

              {currencies.length ?
                <div className="p-2 rounded-xl bg-border">
                  {currencies.map((curr) => (
                    <CurrencyOption
                      key={curr.sign}
                      sign={curr.sign}
                      name={curr.name}
                      handleSelect={selectCurrency}
                      closeModal={closeModal}
                      isSelected={curr.sign === currency.sign}
                    />
                  ))}
                </div>
                :
                <Info
                  icon={<HiOutlineEmojiSad />}
                  title="Oops, we don't have that one."
                  description="Try looking for another currency."
                />
              }
            </div>
          )}
        />
      </div>

      {/* ******** CONTROLS ******** */}
      <Link
        href='/onboarding/choose-template'
        className="btn w-full"
      >
        continue
        <RiArrowRightLine className='text-white text-base' />
      </Link>
    </div>
  )
}

export default ChooseCurrency