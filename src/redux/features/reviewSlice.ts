'use client'
import baseApi from "../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({


    // review: builder.mutation({
    //   query: () => ({
    //     url: "/exercise-review/create-exercise-review",
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       "Content-Type": "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["Review"],
    // }),


    review: builder.mutation({
        query: (review) => ({
          url: "/exercise-review/create-exercise-review",
          method: "POST",
          body: review,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["Review"], // Invalidates 'User' tag after mutation
      }),


    // workPlanDetails: builder.query({
    //     query: (_id) => ({
    //       url: `/workout-plan/workout-plan-details/${_id}`,
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     }),
    //     providesTags: ["Question"], // Marks the fetched data with the "Question" tag
    //   }),
  

  }),
});

export const {  useReviewMutation } =reviewApi;