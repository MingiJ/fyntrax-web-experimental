export interface AddCategoryProps {
  closeModal: any
  edit?: boolean
  id?: string
}

export interface IAddCategoryState {
  name: string
  description: string
  ancestor: {
    name: string
    value: string
  }
  budget: {
    name: string
    value: string
  }
  access: {
    name: string
    value: string
  }
  subcategories: {
    name: string
    description: string
  }[]
}
