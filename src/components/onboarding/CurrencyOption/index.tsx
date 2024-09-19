import React from 'react'

import { CurrencyOptionProps } from '@components/onboarding/CurrencyOption/types'
import { RiCheckLine } from 'react-icons/ri'

const CurrencyOption = ({
  sign,
  name,
  handleSelect,
  isSelected,
  closeModal
}: CurrencyOptionProps) => {
  return (
    <button
      className={`flex items-center gap-3 p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800
      w-full group ${isSelected && 'bg-primary-alt pointer-events-none'}`}
      onClick={() => {handleSelect({sign, name}); closeModal()}}
    > 
      <span className={`text-xs ${isSelected ? 'text-white' : 'text-primary-alt'} font-bold uppercase`}>{sign}</span>
      <div className="h-4 border border-neutral-200 w-px dark:border-neutral-800
      group-hover:border-black dark:group-hover:border-white"></div>
      <p className={`text-sm capitalize flex-1 text-left ${isSelected && 'text-white'}`}>{name}</p>
      {isSelected && <RiCheckLine className='text-white' />}
    </button>
  )
}

export default CurrencyOption