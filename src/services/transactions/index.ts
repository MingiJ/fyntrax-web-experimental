import { api } from '@services/api'
import { ITransaction } from '@utils/interfaces'

const transactionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Create transactions.
    createTransaction: build.mutation<ITransaction, { data: Partial<ITransaction>, accessToken: string }>({
      query: (data) => ({
        url: '/transactions',
        method: 'POST',
        body: data.data,
        headers: {
          authorization: `Bearer ${data.accessToken}`
        },
      })
    }),

    // List budget transactions.
    listTransactions: build.query<{
      ok: boolean
      items: ITransaction[],
      totalPageCount: number
    },
    {
      query?: Partial<ITransaction>,
      page?: number,
      limit?: number,
      accessToken: string
    }>({
      query: (data) => ({
        url: '/transactions',
        params: {
          ...data.query && {...data.query},
          ...data.limit && { limit: data.limit },
          ...data.page && { page: data.page },
        },
        headers: {
          authorization: `Bearer ${data.accessToken}`
        }
      }),
      // transformResponse: (response: { data: { ok: boolean, items: ITransaction[], totalPageCount: number } }, meta, arg) => response.data
    })
  }),
  overrideExisting: true
})

export const { useCreateTransactionMutation, useListTransactionsQuery } = transactionsApi
