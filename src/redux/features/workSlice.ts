'use client'
import baseApi from "../api/baseApi";

export const workApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    allWorkPlan: builder.query({
      query: () => ({
        url: "/workout-plan/all-workout-plan",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Work"],
    }),

    workPlanDetails: builder.query({
        query: (_id) => ({
          url: `/workout-plan/workout-plan-details/${_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["Work"], // Marks the fetched data with the "Question" tag
      }),


      
    allExercise: builder.query({
      query: () => ({
        url: "/exercise/all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Work"],
    }),


    createWorkPlan: builder.mutation({
      query: (create) => ({
        url: "/workout-plan/create-workout-plan",
        method: "POST",
        body: create,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Work"]
    }),
    

  }),
});

export const {  useAllWorkPlanQuery, useWorkPlanDetailsQuery, useAllExerciseQuery, useCreateWorkPlanMutation } = workApi;