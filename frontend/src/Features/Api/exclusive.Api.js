// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN_NAME}${
      import.meta.env.VITE_API_BASE_URL
    }`,
  }),
  endpoints: (builder) => ({
    GetAllBanner: builder.query({
      query: () => `/banner`,
    }),
    GetAllCategory: builder.query({
      query: () => `/category`,
    }),
    GetAllFlashSale: builder.query({
      query: () => `/flashsale`,
    }),
    GetAllBestSale: builder.query({
      query: () => `/bestselling`,
    }),
    GetAllProduct: builder.query({
      query: () => `/product`,
    }),
    GetAllNewArrival: builder.query({
      query: () => `/new-arrival`,
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useGetAllCategoryQuery,
  useGetAllFlashSaleQuery,
  useGetAllBestSaleQuery,
  useGetAllProductQuery,
  useGetAllNewArrivalQuery,
} = exclusiveApi;
