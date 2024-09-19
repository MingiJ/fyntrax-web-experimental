import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const api = createApi({
  // reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL + '/api/',
  }),
  endpoints: () => ({})
})