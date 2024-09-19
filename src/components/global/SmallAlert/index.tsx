import { RiCheckboxCircleLine, RiCloseLine, RiErrorWarningLine, RiInformationLine } from "react-icons/ri"
import { SmallAlertProps } from "./types"
import { useState } from "react"

const SmallAlert = ({
  msg,
  type
}: SmallAlertProps) => {
  const [show, setShow] = useState(true)

  const selectBgColor = (value: string) => {
    switch(value) {
      case 'error':
        return 'bg-red-500/80'

      case 'success':
        return 'bg-green-500/50'

      case 'info':
        return 'bg-sky-100/50 dark:bg-sky-800/10 border border-sky-200 dark:border-sky-800'

      default:
        return 'bg-neutral-300/50 dark:bg-neutral-700/50'
    }
  }
  
  const selectTextColor = (value: string) => {
    switch(value) {
      case 'error':
        return 'text-white'

      case 'success':
        return 'text-black dark:text-white'

      case 'info':
        return 'text-sky-500'

      default:
        return ''
    }
  }
  
  const selectIcon = (value: string) => {
    switch(value) {
      case 'error':
        return <RiErrorWarningLine />

      case 'success':
        return <RiCheckboxCircleLine />

      default:
        return <RiInformationLine />
    }
  }
  return (
    <>
      {show &&
        <div className={`flex items-center justify-between gap-5 p-2 ${selectBgColor(type)} ${selectTextColor(type)} rounded-lg`}>
          <div className="flex items-center gap-3">
            <span className={``}>
              {selectIcon(type)}
            </span>

            <p className={`text-sm font-medium`}>{msg}</p>
          </div>

          <button onClick={() => setShow(false)}>
            <RiCloseLine />
          </button>
        </div>
      }
    </>
  )
}

export default SmallAlert