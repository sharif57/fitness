"use client";
import React, { useState } from "react";
import { ArrowLeft, CalendarDays, FilePenLine } from "lucide-react";
import Link from "next/link";

const AppointmentBooking: React.FC = () => {
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = () => {
    console.log("Discount code applied:", discountCode);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center pt-12"
      style={{ backgroundImage: "url('/images/Appointment.png')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col items-center gap-6 w-full max-w-5xl  z-10">
        <div className="w-full text-white">
          <div className="flex items-center gap-3">
        
            <Link href={'/appointment'}>
            <div className="bg-white p-2 rounded-full">
              <ArrowLeft className="size-6 text-black" />
            </div>
            </Link>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>
          <hr className="mb-8 mt-7 border-[#FFFFFF]  " />
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto">
          {/* Appointment Summary */}
          <div className="mb-6">
            <h2 className="text-[24px] font-semibold mb-4 ">Appointment Summary</h2>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-[#01336F] p-4 rounded-lg">
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tuesday, Jan 14</p>
                  <p className="text-sm text-gray-600">12:00 - 1:00 PM IST</p>
                </div>
              </div>
              <button className=" font-medium hover:text-blue-700 px-4 py-2 rounded-md transition-colors">
              <FilePenLine/>
              </button>
            </div>
          </div>

          {/* Discount Code */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Discount Code</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter your code"
                className="w-full sm:flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button
                onClick={handleApplyDiscount}
                className="w-full sm:w-auto bg-[#101010] text-white px-6 py-3 rounded-md hover:bg-[#101010] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-4 font-poppins">Your Order</h2>
            <div className="space-y-2 font-poppins">
              <div className="flex justify-between text-gray-700">
                <span className="text-[18px] font-medium font-poppins">Fitness Package x 1</span>
                <span className="text-[20px] font-semibold text-[#101010]">$119</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-[18px] font-medium font-poppins">Subtotal</span>
                <span className="text-[20px] font-semibold text-[#101010]">$119</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-[18px] font-medium font-poppins">Discount</span>
                <span className="text-[20px] font-semibold text-[#101010]">-$11</span>
              </div>
              <hr className="my-2 border-gray-300" />
              <div className="flex justify-between font-bold text-gray-900">
                <span className="text-[18px] font-medium font-poppins text-[#101010]">Total</span>
                <span className="text-[20px] font-semibold text-[#101010]">$283.39</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            className="mt-6 w-full bg-[#01336F] text-white py-3 rounded-md text-lg font-medium "
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;