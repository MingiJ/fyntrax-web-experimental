'use client'

import { useEffect } from "react"
import {
  RiCheckboxCircleLine,
  RiCloseLine,
  RiErrorWarningLine,
  RiInformationLine
} from "react-icons/ri"

import { useAlertContext } from "@contexts/AlertContext"

const Alert = () => {
  const { msg, type, show, clearAlert } = useAlertContext()

  const selectBgColor = (value: string) => {
    switch(value) {
      case 'error':
        return 'bg-red-500/30'

      case 'success':
        return 'bg-green-500/20'

      default:
        return 'bg-neutral-300/50 dark:bg-neutral-700/50'
    }
  }
  
  const selectBorderColor = (value: string) => {
    switch(value) {
      case 'error':
        return 'border-red-500/30'

      case 'success':
        return 'border-green-500/30'

      default:
        return 'border-neutral-300 dark:border-neutral-700'
    }
  }
  
  const selectTextColor = (value: string) => {
    switch(value) {
      case 'error':
        return 'text-black dark:text-white'

      case 'success':
        return 'text-black dark:text-white'

      default:
        return ''
    }
  }
  
  const selectIcon = (value: string) => {
    switch(value) {
      case 'error':
        return <RiErrorWarningLine className="text-red-500" />

      case 'success':
        return <RiCheckboxCircleLine className="text-primary-alt" />

      default:
        return <RiInformationLine className="text-primary-alt" />
    }
  }

  // useEffect(() => {
  //   if (show) {
  //     const timeoutId = setTimeout(() => {
  //       setAlert({
  //         msg: '',
  //         type: '',
  //         show: false,
  //       })
  //     }, 1500)

  //     return () => clearTimeout(timeoutId)
  //   }
  // }, [setAlert, show])

  return (
    <>
      {show &&
        <div className={`fixed top-16 left-1/2 z-[1000] -translate-x-1/2 w-[95%] sm:w-max rounded-xl px-4 py-3 ${selectBgColor(type)}
        ${selectTextColor(type)} border ${selectBorderColor(type)} backdrop-blur flex flex-col sm:flex-row items-center
        justify-center gap-2 shadow-md`}>
          <p className="text-lg">
            {selectIcon(type)}
          </p>

          <p className="font-medium text-sm text-center sm:mr-10">{msg}</p>

          <button
            className="absolute h-full right-0 px-4 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition"
            onClick={clearAlert}
          >
            <RiCloseLine />
          </button>
        </div>
      }
    </>
  )
}

export default Alert