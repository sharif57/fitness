'use client'
import baseApi from "../api/baseApi";

export const userWorkPlanApi = baseApi.injectEndpoints({
    overrideExisting: true,
  endpoints: (builder) => ({


   

    myWorkPlanAdd: builder.query({
        query: () => ({
          url: "/work-plan/user-work-plan",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["AddPlan"],
      }),

    bookAppointment: builder.mutation({
        query: (addPlan) => ({
          url: "/work-plan/user-add-work-plan",
          method: "POST",
          body: addPlan,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["AddPlan"], // Invalidates 'User' tag after mutation
      }),


      // userWorkPlanDetails: builder.query({
      //   query: (_id) => ({
      //     url: `/work-plan/user-work-plan-details/${_id}`,
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //   }),
      //   providesTags: ["Work"], // Marks the fetched data with the "Question" tag
      // }),

      userWorkPlanDetails: builder.query({
        query: ({ _id, day }) => ({
          url: `/work-plan/user-work-plan-details/${_id}?day=${day}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["AddPlan"],
      }),
      
  
      

  }),
});

export const {   useBookAppointmentMutation , useMyWorkPlanAddQuery, useUserWorkPlanDetailsQuery } = userWorkPlanApi;