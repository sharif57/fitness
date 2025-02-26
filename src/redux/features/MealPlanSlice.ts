'use client'
import baseApi from "../api/baseApi";

export const userWorkPlanApi = baseApi.injectEndpoints({
    overrideExisting: true,
  endpoints: (builder) => ({


    mealPlanAdd: builder.mutation({
        query: (data) => ({
          url: "/meal/create-meal-plan",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["MealPlan"], // Invalidates 'User' tag after mutation
      }),

      mealPlanList: builder.query({
        query: () => ({
          url: "/meal/user-all-meal-plan",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "application/json",
          },
        }),
        providesTags: ["MealPlan"], 
      }),

      mealPlanDetails: builder.query({
        query: (_id) => ({
          url: `/meal/single-meal-plan/${_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "application/json",
          },
        }),
        providesTags: ["MealPlan"],
      }),

  
      

  }),
});

export const {   useMealPlanAddMutation, useMealPlanListQuery  , useMealPlanDetailsQuery} = userWorkPlanApi;