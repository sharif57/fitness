"use client";
import baseApi from "../api/baseApi";

export const appointmentApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    appointmentAll: builder.query({
      query: () => ({
        url: "/appointment/all-appointment",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Appointment"],
    }),

    appointmentDetails: builder.query({
      query: (_id) => ({
        url: `/appointment//appointment-details/${_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Appointment"], // Marks the fetched data with the "Question" tag
    }),

    appointmentBooking: builder.mutation({
      query: (booking) => ({
        url: "/book-appointment/create-book-appointment",
        method: "POST",
        body: booking,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Appointment"], // Invalidates 'User' tag after mutation
    }),



  }),
});

export const { useAppointmentAllQuery, useAppointmentDetailsQuery , useAppointmentBookingMutation} =
  appointmentApi;
