import { api } from '@services/api'
import { ICategory } from '@services/category/types'

const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Create category.
    createCategory: build.mutation<ICategory, { data: Partial<ICategory>, accessToken: string }>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data.data,
        headers: {
          authorization: `Bearer ${data.accessToken}`
        },
      })
    }),

    // List categories.
    listCategories: build.query<{
      ok: boolean
      items: ICategory[],
      totalPageCount: number
    },
      {
        query?: Partial<ICategory>,
        page?: number,
        limit?: number,
        accessToken: string
      }>({
        query: (data) => ({
          url: '/categories',
          params: {
            ...data.query && { ...data.query },
            ...data.limit && { limit: data.limit },
            ...data.page && { page: data.page },
          },
          headers: {
            authorization: `Bearer ${data.accessToken}`
          }
        }),
        // transformResponse: (response: { data: { ok: boolean, items: ICategory[], totalPageCount: number } }, meta, arg) => response.data
      })
  }),
  overrideExisting: true
})

export const { useCreateCategoryMutation, useListCategoriesQuery } = categoryApi
