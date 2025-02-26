/* eslint-disable @next/next/no-img-element */

"use client";

import { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { PiCameraPlus } from "react-icons/pi";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface UserProfileData {
//   name: string;
//   email: string;
//   phone: string;
//   image: string;
// }

const EditMyProfile = () => {
  const navigate = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in .env.local

  const {
    data: user,
    isLoading,
    error,
  } = useUserProfileQuery<any>();                        

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if ((user )?.data) {
      form.setFieldsValue({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user.data.phone || "",
      });
      setPhoneNumber(user.data.phone || "");

      // Ensure the profile image URL is correct
      setProfileImage(
        user.data.image
          ? user.data.image.startsWith("http")
            ? user.data.image
            : `${API_BASE_URL}${user.data.image}`
          : "https://cdn-icons-png.flaticon.com/128/236/236831.png"
      );
    }
  }, [user, form]);

  // Handle Image Upload & Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle Profile Update
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      const jsonData = JSON.stringify({
        name: values.name,
        phone: phoneNumber,
      });

      formData.append("data", jsonData);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("Sending formData:", [...formData.entries()]);

      const response = await updateProfile(formData).unwrap();
      console.log("Update response:", response);

      toast.success(response.message || "Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // ✅ Redirect to "/profile" after update
      setTimeout(() => navigate.push("/profile"), 3000);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load profile data.
      </p>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh] bg-[#F2F5F7] rounded-2xl p-8">
      <ToastContainer />
      <Form
        form={form}
        name="editProfile"
        layout="vertical"
        className="flex flex-col w-full max-w-4xl space-y-6"
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Profile Image Upload Section */}
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="profileImage" className="relative">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-[#222222bb] flex items-center justify-center text-white rounded-full cursor-pointer">
                <PiCameraPlus size={34} />
              </div>
              <img
                src={
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/128/236/236831.png"
                }
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://cdn-icons-png.flaticon.com/128/236/236831.png")
                }
              />
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Profile Details Form */}
        <div className="flex flex-col space-y-4 w-full ">
          <Form.Item
            label={<span className="text-[#000000]">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input size="large" className="py-2 rounded-lg bg-[#EFFAFF]" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#000000]">Email</span>}
            name="email"
          >
            <Input
              readOnly
              size="large"
              className="py-2 rounded-lg bg-[#EFFAFF]"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#000000]">Phone Number</span>}
            name="phone"
          >
            <Input
              size="large"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="py-2 rounded-lg bg-[#EFFAFF]"
            />
          </Form.Item>

          <Form.Item className="flex justify-center pt-4">
            <button
              className="py-2 px-10 bg-[#01336F] text-[18px] font-normal rounded-lg text-white"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditMyProfile;
