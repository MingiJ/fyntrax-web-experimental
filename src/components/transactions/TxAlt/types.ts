export interface TxAltProps {
  id: string
  title: string
  category?: {
    name: string
    slug: string
    _id: string
  }
  amount: number
  type: string
  date?: Date
  currency: string
  cost?: number
  grandTotal?: number
}