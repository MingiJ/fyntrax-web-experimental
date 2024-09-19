import { InfoProps } from "./types"

const Info = ({
  icon,
  title,
  description,
  controls,
  className
}: InfoProps) => {
  return (
    <div className={`flex flex-col gap-4 xl:gap-6 items-center justify-center text-center p-8 bg-border
    rounded-2xl ${className}`}>
      <div className="text-3xl sm:text-4xl xl:text-5xl flex items-center justify-center text-primary-alt">
        {icon}
      </div>

      <div className="space-y-1.5">
        <h3 className="font-semibold xl:text-lg">{title}</h3>

        <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </div>
      </div>

      {controls && controls}
    </div>
  )
}

export default Info