export interface TxProps {
  id: string
  title: string
  category?: {
    name: string
    slug: string
    _id: string
  }
  amount: number
  type: string
  currency: string
  grandTotal?: number
}