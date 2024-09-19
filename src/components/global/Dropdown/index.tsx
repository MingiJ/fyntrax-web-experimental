'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri"

import { DropdownProps, IDropdownOption } from "./types"

const Dropdown = ({
  active,
  options,
  label,
  setOption,
  name,
  className,
  defaultDisplay
}: DropdownProps) => {
  const [show, setShow] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Handle toggle dropdown.
  const toggleDropdown = () => {
    setShow(prev => !prev)
  }

  // Handle outside dropdown click.
  const outsideClick = useCallback((e: MouseEvent) => {
    if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      e.preventDefault()
      setShow(false)
      document.removeEventListener('click', outsideClick)
    }
  }, [])



  useEffect(() => {
    if (show) {
      document.addEventListener('click', outsideClick)
    } else {
      document.removeEventListener('click', outsideClick)
    }

    return () => {
      document.removeEventListener('click', outsideClick)
    }
  }, [show, outsideClick])

  return (
    <div className={`dropdown h-full w-full sm:w-max min-w-[150px] ${className ?? ''}`} ref={dropdownRef}>
      <div
        className="px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between
        gap-4 rounded-lg cursor-pointer bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur select-none"
        tabIndex={0}
        onClick={toggleDropdown}
        
      >
        {label && (
          <div className='flex items-center gap-4 justify-between min-w-[75px]'>
            <p className="text-xs font-medium text-primary-alt capitalize">{label}</p>
            <div className="bg-neutral-200 dark:bg-neutral-800 h-4 w-px"></div>
          </div>
        )}

        <div className={`flex flex-1 justify-between gap-2 ${!label && 'w-full'}`}>
          <span className={`text-xs font-medium text-neutral-500 dark:text-neutral-400 ${name === 'currency' ? 'uppercase' : 'capitalize'}`}>
            {active || defaultDisplay || '-'}
          </span>
          <span className="text-primary-alt text-base">
            <RiArrowDropDownLine />
          </span>
        </div>
      </div>
      
      {show && <div tabIndex={0} className="dropdown-content menu p-2 shadow-sm bg-white/90 dark:bg-neutral-900 w-full
      backdrop-blur rounded-xl text-xs font-medium border border-neutral-300 dark:border-neutral-800 mt-2">
        <button
          type='button'
          className="p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-neutral-500
          dark:text-neutral-400 hover:text-black dark:hover:text-white capitalize text-left"
          onClick={() => {
            setOption(name, { name: '', value: '' })
            setShow(false)
          }}
        >
          -
        </button>
        {options.map((option: IDropdownOption, i: number) => (
          <button
            key={i}
            type='button'
            className={`p-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg text-neutral-500
            dark:text-neutral-400 hover:text-black dark:hover:text-white capitalize text-left`}
            onClick={() => {
              setOption(name, option)
              setShow(false)
            }}
          >
            {option.name}
          </button>
        ))}
      </div>}
    </div>
  )
}

export default Dropdown
