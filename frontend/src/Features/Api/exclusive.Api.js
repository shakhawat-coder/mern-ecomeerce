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
    GetSingleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    GetSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    getSingleSubCategory: builder.query({
      query: (id) => `/subcategory/${id}`,
    }),
    GetAllNewArrival: builder.query({
      query: () => `/new-arrival`,
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useGetSingleSubCategoryQuery,
  useGetAllFlashSaleQuery,
  useGetAllBestSaleQuery,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetAllNewArrivalQuery,
} = exclusiveApi;
