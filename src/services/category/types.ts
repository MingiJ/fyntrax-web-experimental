export interface ICategory {
  _id: string
  name: string
  description?: string
  slug: string
  sub_categories: Array<string | Partial<ICategory>>
}