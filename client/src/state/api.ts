import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "../state/types"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (builder) => ({
    getKpis: builder.query<Array<GetKpisResponse>, void>({
      query: () => "kpis/kpis/",
      providesTags: ["Kpis"],
    }),

    getProducts: builder.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),

    getTransactions: builder.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
})

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api
