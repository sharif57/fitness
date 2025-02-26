'use client'
import baseApi from "../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({

    subscription: builder.mutation({
      query: (payment) => ({
        url: "/subscription/check-out",
        method: "POST",
        body: payment,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Payment"], // Invalidates 'User' tag after mutation
    }),

    subscriptionUpdate: builder.mutation({
      query: (payment) => ({
        url: "/subscription/update",
        method: "PATCH",
        body: payment,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Payment"], // Invalidates 'User' tag after mutation
    }),


    subscriptionGet: builder.query({
      query: () => ({
        url: "/subscription/get-user-subscripton",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),


    // exersicePost: builder.mutation({
    //   query: (payment) => ({
    //     url: "/exercise/create-exercise",
    //     method: "POST",
    //     body: payment,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       // "Content-Type": "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["Payment"], // Invalidates 'User' tag after mutation
    // }),
    
    exersicePost: builder.mutation({
      query: (formData) => ({
        url: "/exercise/create-exercise",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Payment"], // Invalidate cache after posting
    }),


    

  }),
});

export const {  useSubscriptionMutation , useSubscriptionGetQuery , useExersicePostMutation , useSubscriptionUpdateMutation} = subscriptionApi;