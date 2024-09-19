import { RiErrorWarningLine } from "react-icons/ri"

import { ErrorMsgProps } from "@components/global/ErrorMsg/types"

const ErrorMsg = ({ msg }: ErrorMsgProps) => {
  return (
    <div className="flex items-center gap-2 text-red-500">
      <span className="">
        <RiErrorWarningLine />
      </span>
      <span className="text-xs font-medium">
        {msg}
      </span>
    </div>
  )
}

export default ErrorMsg