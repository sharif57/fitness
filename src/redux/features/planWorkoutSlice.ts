"use client";
import baseApi from "../api/baseApi";

export const planWorkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allWorkoutPlan: builder.query({
      query: ({ page, limit }) => ({
        url: `/workout/all-workout?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Work"],
    }),
    allWorkoutDetails: builder.query({
      query: (_id) => ({
        url: `/workout/single-workout/${_id}`,
        // /workout/single-workout/6839909e3aa405de6c0af525
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Work"],
    }),
  }),
});

export const { useAllWorkoutPlanQuery, useAllWorkoutDetailsQuery } =
  planWorkoutApi;
