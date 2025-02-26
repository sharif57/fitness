"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("Resetting password:", passwords.password);
    // Add your password reset logic here
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F0F2F9] p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-8">
        {/* Left side - Illustration */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/auth/reset.png"
            alt="Running illustration"
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

            <div className="flex items-center gap-2 justify-center mb-6 mt-8">
              <Link
                href="/verifyemail"
                className="flex items-center text-[#345C8C] hover:text-[#284670] transition-colors"
              >
                <IoArrowBack className="h-5 w-5" />
                <span className="text-[#1B365D] text-2xl font-semibold">
                  Reset Password
                </span>
              </Link>
            </div>

            <p className="text-gray-600 mb-8">
              Your password must be 8-20 characters long
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiLock className="h-5 w-5 text-[#345C8C] font-bold" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type={showPasswords.password ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={passwords.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="text-[#345C8C] focus:outline-none"
                >
                  {showPasswords.password ? (
                    <FaRegEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaRegEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiLock className="h-5 w-5 text-[#345C8C] font-bold" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter Password"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
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

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#345C8C] py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
