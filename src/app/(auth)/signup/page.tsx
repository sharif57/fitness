// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { CiLock, CiMail } from "react-icons/ci"
// import { FaPhone } from "react-icons/fa"
// import { FaRegUser } from "react-icons/fa"
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
// import { useRegisterMutation } from "@/redux/features/authSlice"
// interface User {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
// }

// export default function SignUpPage() {
//   const {register} = useRegisterMutation()

//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission
//     console.log(formData)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-[#F0F2F9] p-4">
//       <div className="w-full max-w-6xl flex items-center justify-between gap-8">
//         {/* Left side - Illustration */}
//         <div className="hidden lg:block w-1/2">
//           <Image
//             src="/images/auth/login.svg"
//             alt="Meditation illustration"
//             width={600}
//             height={500}
//             className="w-full h-auto"
//             priority
//           />
//         </div>

//         {/* Right side - Form */}
//         <div className="w-full lg:w-1/2 max-w-md">
//           <div className="bg-white rounded-lg p-8 shadow-sm">
//             {/* Logo */}
//             <div className="flex justify-center mb-6">
//               <Image
//                 src="/images/auth/authlogo.png"
//                 alt="OEG Logo"
//                 width={120}
//                 height={40}
//                 className="h-8 w-auto"
//                 priority
//               />
//             </div>

//             <h1 className="text-[#1B365D] text-2xl font-semibold text-center mb-6">Sign Up</h1>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Input */}
//               <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
//                 <FaRegUser className="h-5 w-5 text-[#345C8C]" />
//                 <input
//                   className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Name"
//                   required
//                 />
//               </div>

//               {/* Email Input */}
//               <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
//                 <CiMail className="h-5 w-5 text-[#345C8C] font-bold" />
//                 <input
//                   className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   required
//                 />
//               </div>

//               {/* Phone Input */}
//               <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
//                 <FaPhone className="h-4 w-4 text-[#345C8C]" />
//                 <input
//                   className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Phone Number"
//                   required
//                 />
//               </div>

//               {/* Password Input */}
//               <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
//                 <CiLock className="h-5 w-5 text-[#345C8C] font-bold" />
//                 <input
//                   className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="text-[#345C8C] focus:outline-none"
//                 >
//                   {showPassword ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#345C8C] mt-4 py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
//               >
//                 Register
//               </button>
//             </form>

//             {/* Login Link */}
//             <p className="text-center mt-6 text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link href="/login" className="text-[#345C8C] hover:underline font-medium">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CiLock, CiMail } from "react-icons/ci"
import { FaPhone } from "react-icons/fa"
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useRegisterMutation } from "@/redux/features/authSlice"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface User {
  name: string
  email: string
  phone: string
  password: string
}

export default function SignUpPage() {
  const [register, { isLoading }] = useRegisterMutation()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([]) // For validation errors

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, email, phone, password } = formData

    // Basic client-side validation
    if (!name || !email || !phone || !password) {
      toast.error("All fields are required.")
      return
    }

    const payload = { name, email, phone, password }
    console.log(payload)

    try {
      const res = await register(payload)

      if ("error" in res && res.error) {
        console.error("Error Response:", res.error)

        // Handle validation errors from the server
        if ('data' in res.error) {
          const errorData = res.error.data as { errorMessages?: string[] };
          if (res.error.status === 400 && errorData.errorMessages) {
            setValidationErrors(errorData.errorMessages)
            toast.error("Validation Error: Please check your input.")
          } else {
            toast.error((res.error.data as { message?: string })?.message || "Registration failed!")
          }
        } else {
          toast.error("Registration failed!")
        }
        return
      }

      if ("data" in res) {
        console.log("Success Response:", res.data)
        toast.success(res.data?.message || "Account created successfully!")
        setFormData({ name: "", email: "", phone: "", password: "" })
        router.push(`/verifyemail?email=${email}`) // Pass email to OTP page
      }
    } catch (error) {
      console.error("Unexpected Error:", error)
      toast.error("An unexpected error occurred!")
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
            src="/images/auth/login.svg"
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

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-4 text-sm text-red-600">
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <FaRegUser className="h-5 w-5 text-[#345C8C]" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <CiMail className="h-5 w-5 text-[#345C8C] font-bold" />
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

              {/* Phone Input */}
              <div className="flex items-center border border-[#345C8C] py-4 px-3 rounded-full bg-white">
                <FaPhone className="h-4 w-4 text-[#345C8C]" />
                <input
                  className="w-full pl-5 outline-none border-none text-[#345C8C] placeholder:text-[#345C8C]"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
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

              <button
                type="submit"
                className="w-full bg-[#345C8C] mt-4 py-4 rounded-full text-white font-semibold hover:bg-[#284670] transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#345C8C] hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}