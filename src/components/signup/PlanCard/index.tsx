import { RiCheckboxCircleFill } from "react-icons/ri"
import { PlanCardProps } from "./types"

const PlanCard = ({
  title,
  description,
  icon,
  plan,
  isActive,
  selectPlan
}: PlanCardProps) => {
  return (
    <div
      className={`relative p-6 rounded-xl bg-border space-y-5 cursor-pointer
      hover:border-black dark:hover:border-white transition
      ${isActive && '!border-primary-alt'}`}
      onClick={() => selectPlan(plan)}
    >
      <div className="text-4xl text-primary-alt">
        {icon}
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>

      {isActive && <RiCheckboxCircleFill className="absolute text-primary-alt top-0 right-4 text-2xl" />}
    </div>
  )
}

export default PlanCard