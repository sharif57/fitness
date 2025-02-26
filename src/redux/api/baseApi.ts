"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://115.127.156.132:3005/api/v1" }),
   tagTypes: [
    "AddPlan",
    "Package",
    "Room",
    "User",
    "WorkoutPlan",
    "NutritionPlan",
    "Work",
    'MealPlan',
    'Review',
    'Appointment',
    "Payment",
    "Setting",
  ], // Declare global tag types
  endpoints: () => ({}), // Empty object, later extended using injectEndpoints
});

export default baseApi;
