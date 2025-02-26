"use client"

import { useState } from "react"
import Cookies from 'js-cookie'
import Image from "next/image"
import Link from "next/link"
import { CiLock } from "react-icons/ci"
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useLoginMutation } from "@/redux/features/authSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation"
import { saveTokens } from "@/service/authService"

interface UserCredentials {
  email: string
  password: string
}



export default function Login() {
  const router = useRouter()
  const [login] = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<UserCredentials>({
    email: "",
    password: "",
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap()
  
      console.log(response)
  
      if (response.success) {
        // Save tokens and user data to localStorage and cookies
        await saveTokens(response.data.accessToken)
        localStorage.setItem("accessToken", response.data.accessToken)
        // Cookies.set("accessToken", response.data.accessToken, {
        //   expires: 1,
        //   path: "/",
        //   sameSite: "Strict",
        //   secure: true,
        // })
        localStorage.setItem("refreshToken", response.data.refreshToken)
        localStorage.setItem("user", JSON.stringify(response.data.user))
  
        // Show success toast notification
        toast.success("Login Successful!", {
          autoClose: 1500,
        })
  
        // Check if the user has a gender field
        if (!response?.data?.user?.gender) {
          // Redirect to the details page if gender is missing
          setTimeout(() => {
            router.push("/details")
          }, 1500) // Redirect after 1.5 seconds
        } else {
          // Redirect to the home page if gender is present
          setTimeout(() => {
            router.push("/")
          }, 1500) // Redirect after 1.5 seconds
        }
      } else {
        toast.error(response.message || "Invalid credentials!")
      }
    } catch (error: unknown) {
      console.error("Login error:", error)
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data &&
        "message" in error.data
      ) {
        toast.error((error.data as { message: string }).message || "Something went wrong. Try again!")
      } else {
        toast.error("Something went wrong. Try again!")
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F0F2F9] p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-8">
        {/* Left side - Illustration */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/images/auth/login.png"
            alt="Meditation illustration"
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

            <h1 className="text-[#1B365D] text-2xl font-semibold text-center mb-6">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
             

              {/* Email Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <FaRegUser className="h-5 w-5 text-[#345C8C]" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiLock className="h-5 w-5 text-[#345C8C] font-bold" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#345C8C] focus:outline-none"
                >
                  {showPassword ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                </button>
              </div>

             <div className=" flex justify-end items-end">
             <Link href="/forgot" className="  text-right text-sm mt-2 text-[#345C8C] hover:underline">
                Forgot password?
              </Link>
             </div>

              <button
                type="submit"
                className="w-full bg-[#345C8C] mt-4 py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
              >
                Login
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/signup" className="text-[#345C8C] hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

