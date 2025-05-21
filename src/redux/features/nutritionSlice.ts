"use client";
import baseApi from "../api/baseApi";

export const nutritionApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    allNutrition: builder.query({
      query: (page) => ({
        url: `/nutrition/all-nutrition?page=${page}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["NutritionPlan"],
    }),

    createNutrition: builder.mutation({
      query: (data) => ({
        url: "/meal/generate-meal-plan",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    nutritionDetails: builder.query({
      query: (_id) => ({
        url: `/nutrition/nutriton-details/${_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["NutritionPlan"], // Marks the fetched data with the "Question" tag
    }),
  }),
});

export const {
  useAllNutritionQuery,
  useNutritionDetailsQuery,
  useCreateNutritionMutation,
} = nutritionApi;
