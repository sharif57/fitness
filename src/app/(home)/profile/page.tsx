/* eslint-disable @next/next/no-img-element */
"use client";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  role: string;
  image?: string;
}

const UserProfile: React.FC = () => {
  const { data, isLoading, error } = useUserProfileQuery<any>();

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    if (data?.data) {
      setUserProfile(data.data); // Ensure data updates only on the client
    }
  }, [data]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !userProfile)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load profile data.
      </p>
    );

  const { name, email, phone, image } = userProfile;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

  // Ensure the image has the full URL
  const imageUrl = image?.startsWith("http")
    ? image
    : `${API_BASE_URL}${image || "/images/user.png"}`;

  return (
    <div className="bg-[#F2F5F7] min-h-screen flex flex-col items-center py-10">
      {/* Profile Picture */}
      <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-gray-300 shadow-lg">
        <img
       
          src={imageUrl}
          alt={`${name}'s Profile`}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/images/user.png")} // Fallback in case of error
        />
      </div>

      {/* Subscribe Button */}
      <button className="bg-[#01336F] text-white px-10 py-2 rounded-lg  mt-4">
        Subscribe Plan
      </button>

      {/* User Details Form */}
      <div className="mt-8 w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Name</label>
          <input
            type="text"
            value={name}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone || "Not Provided"}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div className="w-52 mx-auto">
          <Link href="/editprofile">
            <button className="bg-[#01336F] text-white px-6 py-2 rounded-lg w-full">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
