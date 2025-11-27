// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Login from "../../Pages/Login/Login";

export const exclusiveApi = createApi({
  reducerPath: "exclusive",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_DOMAIN_NAME}${import.meta.env.VITE_API_BASE_URL
      }`,
    credentials: "include",
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

    // ============get user registration via frontend===========
    getRegisterUser: builder.mutation({
      query: (userData) => ({
        url: `/auth/registration`,
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // ==================verify otp==================
    getVerifyOtp: builder.mutation({
      query: (otpData) => ({
        url: `/auth/verify_otp`,
        method: "POST",
        body: otpData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // ===============Login user ==============
    getLoginUser: builder.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // ============contact form submission===========
    getContactForm: builder.mutation({
      query: (contactData) => ({
        url: `/contact`,
        method: "POST",
        body: contactData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
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
  useGetRegisterUserMutation,
  useGetVerifyOtpMutation,
  useGetLoginUserMutation,
  useGetContactFormMutation,
} = exclusiveApi;
