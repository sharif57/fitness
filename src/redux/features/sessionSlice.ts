"use client";

import baseApi from "../api/baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/chat/message",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Session"],
    }),

    userChats: builder.query({
      query: (id) => ({
        url: `/chat/history/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Session"],
    }),

    createSession: builder.mutation({
      query: (data) => ({
        url: "/chat/session",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Session"],
    }),

    userAllSessions: builder.query({
      query: () => ({
        url: "/chat/sessions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Session"],
    }),


  }),
});

export const {
  useAskQuestionMutation,
  useUserChatsQuery,
  useCreateSessionMutation,
  useUserAllSessionsQuery,

} = sessionApi;
