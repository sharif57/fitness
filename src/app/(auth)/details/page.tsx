
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import Select from "react-select"
import countryList from "react-select-country-list"
import { ChevronDown } from "lucide-react"
import type React from "react"
import { useUpdateProfileMutation } from "@/redux/features/userSlice"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

// Types
type FormData = {
  gender: string
  age: number
  height: number
  weight: number
  country: string
  fitnessLevel: string
  injury: string
}

// Options for dropdowns
const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
]

const heightUnits = [
  { value: "cm", label: "cm" },
  { value: "ft", label: "ft" },
]

const weightUnits = [
  { value: "kg", label: "kg" },
  { value: "lbs", label: "lbs" },
]

const fitnessLevels = [
  { value: "BASIC", label: "Basic" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
]

const injuryOptions = [
  { value: "NONE", label: "None" },
  { value: "LOWER_BACK", label: "Lower back" },
  { value: "KNEE", label: "Knee" },
  { value: "SHOULDER", label: "Shoulder" },
  { value: "OTHER", label: "Other" },
]

export default function ProfileForm() {
  const [formData, setFormData] = useState<FormData>({
    gender: "MALE",
    age: 24,
    height: 178,
    weight: 78,
    country: "ES",
    fitnessLevel: "BASIC",
    injury: "NONE",
  })

  const router =  useRouter()

  const [updateProfile] = useUpdateProfileMutation()

  const countries = countryList().getData()

  const customStyles = {
    control: (base: any) => ({
      ...base,
      border: "1px solid #E5E7EB",
      borderRadius: "9999px",
      padding: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#345C8C",
      },
    }),
    option: (base: any, state: { isSelected: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected ? "#345C8C" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "#345C8C" : "#F3F4F6",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create a new FormData object
    const formDataObj = new FormData()

    // Convert formData to JSON and append it to FormData
    const jsonData = JSON.stringify({
      gender: formData.gender,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      country: formData.country,
      fitnessLevel: formData.fitnessLevel,
      injury: formData.injury,
    })
    formDataObj.append("data", jsonData)



    // Log the FormData entries for debugging
    console.log("Sending formData:", [...formDataObj.entries()])

    try {
      // Call the updateProfile mutation with FormData
      const response = await updateProfile(formDataObj).unwrap()
      console.log("Update response:", response)

      router.push('/')
      // Show success toast notification
      toast.success(response.message || "Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (error) {
      console.error("Failed to update profile:", error)

      // Show error toast notification
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F9] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Please select your Gender</label>
              <Select
                value={genderOptions.find((option) => option.value === formData.gender)}
                onChange={(option) => setFormData((prev) => ({ ...prev, gender: option?.value || "MALE" }))}
                options={genderOptions}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => <ChevronDown className="h-4 w-4 text-gray-400" />,
                }}
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What is your age?</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData((prev) => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#345C8C]"
                min="1"
                max="120"
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What is your Height?</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData((prev) => ({ ...prev, height: parseFloat(e.target.value) }))}
                  className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#345C8C]"
                />
                <div className="w-32">
                  <Select
                    value={heightUnits.find((option) => option.value === (formData as any).heightUnit)}
                    onChange={(option) => setFormData((prev) => ({ ...prev, heightUnit: option?.value || "cm" }))}
                    options={heightUnits}
                    styles={customStyles}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator: () => <ChevronDown className="h-4 w-4 text-gray-400" />,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What is your Weight?</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weight: parseFloat(e.target.value) }))}
                  className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#345C8C]"
                />
                <div className="w-32">
                  <Select
                    value={weightUnits.find((option) => option.value === (formData as any).weightUnit)}
                    onChange={(option) => setFormData((prev) => ({ ...prev, weightUnit: option?.value || "kg" }))}
                    options={weightUnits}
                    styles={customStyles}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator: () => <ChevronDown className="h-4 w-4 text-gray-400" />,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Which country are you from?</label>
              <Select
                value={countries.find((option) => option.value === formData.country)}
                onChange={(option) => setFormData((prev) => ({ ...prev, country: option?.value || "ES" }))}
                options={countries}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => <ChevronDown className="h-4 w-4 text-gray-400" />,
                }}
                formatOptionLabel={({ label, value }: any) => (
                  <div className="flex items-center gap-2">
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${value.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${value.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {label}
                  </div>
                )}
              />
            </div>

            {/* Fitness Level */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Fitness Level ?</label>
              <Select
                value={fitnessLevels.find((option) => option.value === formData.fitnessLevel)}
                onChange={(option) => setFormData((prev) => ({ ...prev, fitnessLevel: option?.value || "BASIC" }))}
                options={fitnessLevels}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => <ChevronDown className="h-4 w-4 text-gray-400" />,
                }}
              />
            </div>

            {/* Injury */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Any injury</label>
              <Select
                value={injuryOptions.find((option) => option.value === formData.injury)}
                onChange={(option) => setFormData((prev) => ({ ...prev, injury: option?.value || "NONE" }))}
                options={injuryOptions}
                styles={customStyles}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => <ChevronDown className="h-4 w-4 text-gray-400" />,
                }}
              />
            </div>

          

            <button
              type="submit"
              className="w-full bg-[#345C8C] text-white py-4 rounded-full hover:bg-[#284670] transition-colors font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

