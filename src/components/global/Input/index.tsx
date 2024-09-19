import ErrorMsg from "@components/global/ErrorMsg"

import { InputProps } from "@components/global/Input/types"

const Input = (props: InputProps) => {
  const { err, label, info, ...rest } = props

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={rest.name} className={`capitalize
      text-xs xs:text-sm ${rest.labelStyle && rest.labelStyle}
      ${err && 'text-red-500'}`}>
        {label}
      </label>

      <input
        className={`px-3 py-2.5 bg-transparent border rounded-lg text-sm md:text-base
        ${err ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'}
        !bg-neutral-50 dark:!bg-neutral-900/50`}
        {...rest}
      />

      {info && (
        <span className="text-xs text-neutral-500">
          {info}
        </span>
      )}

      {err && <ErrorMsg msg={err} />}
    </div>
  )
}

export default Input
