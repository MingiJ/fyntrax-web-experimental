import { ITransactionType } from "@utils/interfaces"

export interface AddTransactionProps {
  edit?: boolean
  id?: string
  budgetId?: string
  budgetName?: String
  closeModal: any
  type: ITransactionType
  account?: {
    name: string
    id: string
  }
}
