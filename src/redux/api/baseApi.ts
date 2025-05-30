"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://server.oegfitness.com/api/v1" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.10.233:3005/api/v1" }),
  tagTypes: [
    "AddPlan",
    "Package",
    "Room",
    "User",
    "WorkoutPlan",
    "NutritionPlan",
    "Work",
    "MealPlan",
    "Review",
    "Appointment",
    "Payment",
    "Setting",
    "Session",
  ], // Declare global tag types
  endpoints: () => ({}), // Empty object, later extended using injectEndpoints
});

export default baseApi;
