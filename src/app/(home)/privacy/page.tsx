'use client'
import { usePrivacyGetQuery } from "@/redux/features/setting"

export default function PrivacyPolicy() {
  const { data } = usePrivacyGetQuery(undefined)
  const privacy = data?.data?.[0] // Access the first object in the array

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <div className="space-y-6 pr-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          {/* Render HTML safely */}
          <div dangerouslySetInnerHTML={{ __html: privacy?.description }} />
        </section>
      </div>
    </div>
  )
}
