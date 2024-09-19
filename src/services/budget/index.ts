import { api } from '@services/api'
import { IBudget } from '@utils/interfaces'

const budgetApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Create budget.
    createBudget: build.mutation<IBudget, { data: Partial<IBudget>, accessToken: string }>({
      query: (data) => ({
        url: '/budget',
        method: 'POST',
        body: data.data,
        headers: {
          authorization: `Bearer ${data.accessToken}`
        },
      })
    }),

    // Create budget.
    createBudgetCategory: build.mutation<IBudget, { data: Partial<IBudget>, accessToken: string }>({
      query: (data) => ({
        url: '/budget/addCategory',
        method: 'POST',
        body: data.data,
        headers: {
          authorization: `Bearer ${data.accessToken}`
        },
      })
    }),

    listBudgetCategoryTransactions: build.query<{
      ok: boolean
      items: IBudget[],
      totalPageCount: number
    },
      {
        query?: Partial<IBudget>,
        page?: number,
        limit?: number,
        accessToken: string
      }>(
        {

          query: (data) => ({
            url: '/budget/categoryTransactions',
            params: {
              ...data.query && { ...data.query },
              ...data.limit && { limit: data.limit },
              ...data.page && { page: data.page },
            },
            headers: {
              authorization: `Bearer ${data.accessToken}`
            }
          }),
        }),
    // List budget.
    listBudgetCategories: build.query<{
      ok: boolean
      items: IBudget[],
      totalPageCount: number
    },
      {
        query?: Partial<IBudget>,
        page?: number,
        limit?: number,
        accessToken: string
      }>({
        query: (data) => ({
          url: '/budget/categories',
          params: {
            ...data.query && { ...data.query },
            ...data.limit && { limit: data.limit },
            ...data.page && { page: data.page },
          },
          headers: {
            authorization: `Bearer ${data.accessToken}`
          }
        }),
      }),
    // List budget.
    listBudgets: build.query<{
      ok: boolean
      items: IBudget[],
      totalPageCount: number
    },
      {
        query?: Partial<IBudget>,
        page?: number,
        limit?: number,
        accessToken: string
      }>({
        query: (data) => ({
          url: '/budget/budgetStats',
          params: {
            ...data.query && { ...data.query },
            ...data.limit && { limit: data.limit },
            ...data.page && { page: data.page },
          },
          headers: {
            authorization: `Bearer ${data.accessToken}`
          }
        }),
      })
  }),
  overrideExisting: true
})

export const { useCreateBudgetMutation, useListBudgetsQuery, useListBudgetCategoriesQuery, useCreateBudgetCategoryMutation, useListBudgetCategoryTransactionsQuery } = budgetApi
