/* eslint-disable @next/next/no-img-element */
"use client";

import { useMyWorkPlanAddQuery } from "@/redux/features/userworkplanSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";

/* Define TypeScript Interface */
interface Exercise {
  _id: string;
  exerciseName: string;
  gifImage: string;
  description: string;
}

interface Workout {
  isCompleted: boolean;
  day: number;
  warmUp: { duration: number; exercises: Exercise[] };
  mainWorkout: { duration: number; exercises: Exercise[] };
  coolDown: { duration: number; exercises: Exercise[] };
}

interface WorkoutPlan {
  _id: string;
  user: string;
  totalDays: number;
  completedDays: number;
  workoutPlanId: {
    _id: string;
    planName: string;
    description: string;
    image?: string;
    workouts: Workout[];
  };
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || "";

export default function WorkPlan() {
  const { data , isLoading} = useMyWorkPlanAddQuery(undefined);
  console.log(data?.data)
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (isLoading) return <div>Loading...</div>;

  const workPlans: WorkoutPlan[] = data?.data || [];

  return (
    <div className="lg:p-6 p-3 container mx-auto h-auto">
      <h2 className="lg:text-[48px] text-[30px] font-semibold text-center mb-6">
        My Workout Plan
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-wrap">
        {workPlans.length > 0 ? (
          workPlans.map((workPlan: WorkoutPlan) => {
            const { planName, description, image } = workPlan.workoutPlanId;
            const imageUrl = image ? `${IMAGE_BASE_URL}${image}` : "/default-workout.png";
            const { totalDays, completedDays } = workPlan;
            const progress = ((completedDays / totalDays) * 100).toFixed(2);

            return (
              <Link href={`/myworkoutplan/${workPlan._id}`} key={workPlan._id}>
                <div className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-xl relative flex flex-col ">
                  {hydrated && (
                    <img
                      src={imageUrl}
                      alt={planName || "Workout Plan"}
                      className="w-full h-[180px] object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 flex flex-col justify-between mt-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="lg:text-[20px] text-[18px] font-medium">
                          {planName.slice(0, 18)}
                        </h3>
                        <span className="text-gray-500 text-sm">Time: {totalDays} day</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{description.slice(0,80)}.....</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[18px] font-bold">Progress</span>
                        <p>{progress}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-[20px] mt-3">
                        <div
                          className="bg-[#00BA00] h-[20px] rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No workout plans available.</p>
        )}
      </div>
    </div>
  );
}
