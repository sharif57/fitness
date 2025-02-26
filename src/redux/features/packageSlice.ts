'use client'
import baseApi from "../api/baseApi";

export const packageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({


    allPackageGet: builder.query({
      query: () => ({
        url: "/package/all-package",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Package"],
    }),

    // workPlanDetails: builder.query({
    //     query: (_id) => ({
    //       url: `/workout-plan/workout-plan-details/${_id}`,
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     }),
    //     providesTags: ["Package"], // Marks the fetched data with the "Question" tag
    //   }),
  

  }),
});

export const {  useAllPackageGetQuery } = packageApi;