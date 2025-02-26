"use client";
import { useMealPlanDetailsQuery } from "@/redux/features/MealPlanSlice";
import { useParams } from "next/navigation";
import React from "react";

export default function MealPlanDetails() {
  const params = useParams();
  const id = params?.id as string;
  const { data } = useMealPlanDetailsQuery(id);

  interface MealPlanItem {
    _id: string;
    day: string;
    breakfast: string;
    midMorningSnack: string;
    lunch: string;
    afternoonSnack: string;
    dinner: string;
    calories: number;
    carb: number;
    protein: number;
    fiber: number;
    fat: number;
  }
  
  const planData: MealPlanItem[] = data?.data?.plans || [];
  
  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="bg-white">
          <h2 className="text-center lg:text-[48px] text-[30px] font-semibold">
            Plan Overview
          </h2>
          <h3 className="lg:text-[32px] text-[18px] font-semibold mt-6">
            {data?.data?.planName || "Nutrition Plan"}
          </h3>

          <div className="mt-6 bg-white overflow-hidden shadow-xl p-4 rounded-lg">
            <div className="rounded-lg bg-white">
              <div className="py-6 border-b">
                <p className="text-[#000000] lg:text-[24px] font-semibold">
                  Focus: Balanced Nutrition for a Healthier Lifestyle.
                </p>
              </div>
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#E6EBF1] text-gray-700 text-left">
                    <tr>
                      <th className="p-3 border">Day</th>
                      <th className="p-3 border">Breakfast</th>
                      <th className="p-3 border">Mid-Morning Snack</th>
                      <th className="p-3 border">Lunch</th>
                      <th className="p-3 border">Afternoon Snack</th>
                      <th className="p-3 border">Dinner</th>
                      <th className="p-3 border">Calories</th>
                      <th className="p-3 border">Carbs</th>
                      <th className="p-3 border">Protein</th>
                      <th className="p-3 border">Fiber</th>
                      <th className="p-3 border">Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planData.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50">
                        <td className="p-3 border">{item.day}</td>
                        <td className="p-3 border">{item.breakfast}</td>
                        <td className="p-3 border">{item.midMorningSnack}</td>
                        <td className="p-3 border">{item.lunch}</td>
                        <td className="p-3 border">{item.afternoonSnack}</td>
                        <td className="p-3 border">{item.dinner}</td>
                        <td className="p-3 border">{item.calories}</td>
                        <td className="p-3 border">{item.carb}</td>
                        <td className="p-3 border">{item.protein}</td>
                        <td className="p-3 border">{item.fiber}</td>
                        <td className="p-3 border">{item.fat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {planData.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No meal plan data available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
