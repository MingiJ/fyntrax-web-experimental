import {
  RiBankCardLine,
  RiBankLine,
  RiCellphoneLine,
  RiPaypalLine
} from "react-icons/ri"

export const getIcon = (value: string | undefined) => {
  switch (value) {
    case 'mpesa':
      return <RiCellphoneLine />
    
    case 'paypal':
      return <RiPaypalLine />

    case 'bank':
      return <RiBankLine />
    
    default:
      return <RiBankCardLine />
  }
}