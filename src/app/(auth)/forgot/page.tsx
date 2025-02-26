/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { useForgotPasswordMutation } from "@/redux/features/authSlice";
import { message } from "antd"; // Assuming you're using Ant Design for notifications

// Define the type for the API response
interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const response: ForgotPasswordResponse = await forgotPassword({ email }).unwrap();

      if (response.success) {
        message.success(response.message || "OTP has been sent to your email!");
        router.push(`/resetotp?email=${email}`);
      } else {
        message.error(response.message || "Failed to send OTP.");
      }
    } catch (error: any) {

      message.error(error.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F0F2F9] p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-8">
        {/* Left side - Illustration */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/auth/forgot.png"
            alt="Exercise illustration"
            width={600}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/auth/authlogo.png"
                alt="OEG Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>

            <div className="flex items-center gap-2 justify-center mb-6">
              <Link
                href="/login"
                className="flex items-center text-[#345C8C] hover:text-[#284670] transition-colors"
              >
                <IoArrowBack className="h-5 w-5" />
                <span className="text-[#1B365D] text-2xl font-semibold">
                  Forgot Password
                </span>
              </Link>
            </div>

            <p className="text-gray-600 mb-6 text-center">
              Please enter your email address to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiMail className="h-5 w-5 text-[#345C8C] font-bold" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="E-mail"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#345C8C] mt-4 py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
              >
                Send OTP
              </button>
            </form>

            {/* Back to Login Link */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-[#345C8C] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}