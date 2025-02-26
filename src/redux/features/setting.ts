'use client'
import baseApi from "../api/baseApi";

export const settingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({


    privacyGet: builder.query({
      query: () => ({
        url: "/privacy",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Setting"],
    }),

    termsGet: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Setting"],
    }),
    aboutGet: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Setting"],
    }),

  

  }),
});

export const {  usePrivacyGetQuery, useTermsGetQuery, useAboutGetQuery } = settingApi;