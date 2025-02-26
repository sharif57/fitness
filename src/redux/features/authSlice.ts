


"use client"; // Ensures this file is used only on the client

import baseApi from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // resetPassword: builder.mutation({
    //   query: (data) => {
    //     if (typeof window !== "undefined") {
    //       const token = sessionStorage.getItem("verifyToken"); // Corrected token retrieval
    //       if (!token) {
    //         throw new Error("No token found. Please verify your email again.");
    //       }
    //       return {
    //         url: "/auth/reset-password",
    //         method: "POST",
    //         body: data,
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       };
    //     }
    //     throw new Error("Unable to access sessionStorage.");
    //   },
    // }),

    resetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("Authorization");

        if (!token) {
          throw new Error("No token found. Please verify your email again.");
        }

        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data, // Pass the payload here
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authApi;

