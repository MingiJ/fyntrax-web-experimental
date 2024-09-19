import { LoaderProps } from "./types"

const Loader = ({
  withContainer,
  className
}: LoaderProps) => {
  return (
    <div className={`${withContainer && 'flex items-center justify-center w-full h-full'} ${className}`}>
      <div className="border-2 border-neutral-200 dark:border-neutral-800
      !border-t-primary-alt rounded-full w-6 h-6 animate-spin" />
    </div>
  )
}

export default Loader