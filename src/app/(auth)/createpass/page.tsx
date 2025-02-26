/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useResetPasswordMutation } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Types for the password reset request
interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password length
    if (passwords.password.length < 8 || passwords.password.length > 10) {
      setError("Password must be 8-10 characters long");
      return;
    }

    // Validate password match
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
   

    try {
      const token = localStorage.getItem("Authorization");
      if (!token) {
        setError("No token found. Please verify your email again.");
        return;
      }

      const payload: ResetPasswordPayload = {
        newPassword: passwords.password,
        confirmPassword: passwords.confirmPassword,
      };

      console.log(payload)

      // Call the resetPassword mutation with the payload
      const response = await resetPassword(payload).unwrap();
      console.log(response)

      if (response.success) {
        toast.success(response.message || "Password reset successfully!");
        localStorage.removeItem('Authorization')
        // Redirect to login page after success
        router.push('/login')
      } 
      else {
        setError(response.message || "Failed to reset password.");
      }
    } catch (error: any) {
      setError(error?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F0F2F9] p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-8">
        {/* Left side - Illustration */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/auth/createpass.png"
            alt="Running illustration"
            width={600}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-[#E5E7EB]">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/images/auth/authlogo.png"
                alt="OEG Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <Link
                href="/verify-email"
                className="flex items-center text-[#345C8C] hover:text-[#284670] transition-colors"
              >
                <IoArrowBack className="h-5 w-5" />
                <span className="ml-1 text-[29px] font-bold">Reset Password</span>
              </Link>
            </div>

            <p className="text-gray-600 mb-8 text-sm text-center">
              Your password must be 8-10 characters long
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiLock className="h-5 w-5 text-[#345C8C] font-bold" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C] text-sm"
                  type={showPasswords.password ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={passwords.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="text-[#345C8C] focus:outline-none"
                >
                  {showPasswords.password ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiLock className="h-5 w-5 text-[#345C8C] font-bold" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C] text-sm"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter Password"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="text-[#345C8C] focus:outline-none"
                >
                  {showPasswords.confirmPassword ? (
                    <FaRegEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaRegEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#345C8C] py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors text-sm"
              >
                {isLoading ? "Resetting..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
