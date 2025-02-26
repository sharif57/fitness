'use client'
import baseApi from "../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({


    // paymentData: builder.mutation({
    //   query: () => ({
    //     url: "/payment/create-checkout-session",
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       "Content-Type": "application/json",
    //     },
    //   }),
    //   invalidatesTags: ["Room"],
    // }),

    paymentData: builder.mutation({
      query: (payment) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body: payment,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Payment"], // Invalidates 'User' tag after mutation
    }),



  }),
});

export const {  usePaymentDataMutation } = paymentApi;