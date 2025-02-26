"use client";
import baseApi from "../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    bookAppointment: builder.query({
      query: () => ({
        url: "/book-appointment/user-book-appointment",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Room"],
    }),
  }),
});

export const { useBookAppointmentQuery } = bookingApi;
