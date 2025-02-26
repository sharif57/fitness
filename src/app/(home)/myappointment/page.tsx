/* eslint-disable @next/next/no-img-element */
"use client";
import { useBookAppointmentQuery } from "@/redux/features/bookingSlice";
import React from "react";

// ✅ Define TypeScript Interface for Appointment Data
interface Appointment {
  _id: string;
  name: string;
  age: number;
  gender: string;
  description: string;
  selectedDate: string;
  selectedTime: string;
  paymentAmount: number;
  paymentStatus: "COMPLETED" | "PENDING";
  appointmentId: {
    _id: string;
    title: string;
    image?: string;
    description: string[];
    price: number;
    availableTimes: string[];
    status: boolean;
  };
}

export default function MyAppointment() {
  const { data } = useBookAppointmentQuery(undefined);

  // Base API URL from environment variables
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || "";

  // Extracting appointment data safely
  const appointments: Appointment[] = data?.data || [];

  return (
    <div className="lg:p-6 p-3 container mx-auto h-screen">
      <h2 className="lg:text-[48px] text-[30px] font-semibold text-center mb-6">
        My Appointments
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-wrap">
        {appointments.length > 0 ? (
          appointments.map((appointment: Appointment) => {
            const imageUrl = appointment.appointmentId?.image
              ? `${IMAGE_BASE_URL}${appointment.appointmentId.image}`
              : "/default-avatar.png"; // Fallback image

            return (
              <div
                key={appointment._id}
                className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-xl"
              >
                <img
                  src={imageUrl}
                  alt={appointment.appointmentId?.title || "Appointment"}
                  className="w-full h-[280px] object-cover rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="lg:text-[24px] text-[20px] font-medium">
                      {appointment.appointmentId?.title || "No Title"}
                    </h3>
                    <p className="text-right font-bold lg:text-[32px] text-[20px] mt-2 text-[#01336F]">
                      ${appointment.paymentAmount}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="block text-gray-600">
                      Date: {appointment.selectedDate}
                    </span>
                    <span className="block text-gray-600">
                      Time: {appointment.selectedTime}
                    </span>
                  </div>

                  {/* <p
                    className={`text-sm text-center mt-2 py-1 rounded-md ${
                      appointment.paymentStatus === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.paymentStatus === "COMPLETED"
                      ? "✅ Paid"
                      : "⏳ Pending"}
                  </p> */}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            No appointments booked yet.
          </p>
        )}
      </div>
    </div>
  );
}
