import Loader from "@components/global/Loader"

import { ButtonWithLoaderProps } from "./types"

const ButtonWithLoader = (props: ButtonWithLoaderProps) => {
  const { isLoading, children, ...rest } = props

  return (
    <button
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Loader /> : children}
    </button>
  )
}

export default ButtonWithLoader