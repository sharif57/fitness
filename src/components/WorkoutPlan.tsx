import { useAllWorkoutPlanQuery } from "@/redux/features/planWorkoutSlice";
import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
import Link from "next/link";
import React from "react";
interface Workout {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}
export default function WorkoutPlan() {
  // const { data } = useAllWorkoutPlanQuery(undefined);
  const { data } = useAllWorkoutPlanQuery({ page: 1, limit: 9 });

  console.log(data, "workout data plan");
  const { data: userSubscription } = useSubscriptionGetQuery(undefined);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
  // console.log(API_BASE_URL, "API_BASE_URL");

  return (
    <div>
      <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="lg:text-[40px] text-[24px] font-semibold">
            Workout Plans
          </h2>
          <Link
            href="/plan_workout"
            className="text-[#01336F] text-[18px] hover:underline font-medium"
          >
            See all
          </Link>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.data?.slice(0, 3).map((plan: Workout) => (
            <div
              key={plan.name}
              className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
            >
              {/* Image & Rating */}
              <div className="relative">
                <img
                  src={`${API_BASE_URL}${plan.image}`}
                  alt={plan.title}
                  className="w-full object-cover rounded-lg h-[290px]"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://cdn-icons-png.flaticon.com/128/236/236831.png")
                  }
                />
              </div>

              {/* Content */}
              <div className="pt-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="lg:text-[24px] text-[18px] font-medium">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-gray-500 text-[16px]">{plan.title}</p>
              </div>
              <div className="pt-4 flex justify-between gap-4">
                {userSubscription?.data?.package?.name === "workout" ||
                userSubscription?.data?.package?.name ===
                  "workout & nutrition" ? (
                  <Link
                    href={`/plan_workout/${plan._id}`}
                    className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
                  >
                    Read More
                  </Link>
                ) : (
                  <Link
                    href="/subscription1"
                    className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
                  >
                    Read More
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
