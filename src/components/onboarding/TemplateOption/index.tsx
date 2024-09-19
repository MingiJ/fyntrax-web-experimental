import { RiCheckboxCircleFill } from "react-icons/ri"

import { TemplateOptionProps } from "@components/onboarding/TemplateOption/types"

const TemplateOption = ({
  name,
  icon,
  isSelected,
  selectTemplate
}: TemplateOptionProps) => {
  return (
    <div
      className={`relative p-4 rounded-xl bg-border space-y-5 cursor-pointer
      hover:border-black dark:hover:border-white transition
      ${isSelected && '!border-primary-alt'}`}
      onClick={() => selectTemplate(name)}
    >
      <div className="text-3xl text-primary-alt">
        {icon}
      </div>

      <h3 className="font-medium capitalize">{name}</h3>

      {isSelected && <RiCheckboxCircleFill className="absolute text-primary-alt top-0 right-4 text-2xl" />}
    </div>
  )
}

export default TemplateOption