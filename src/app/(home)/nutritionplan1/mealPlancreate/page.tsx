"use client";

import React, { useEffect, useState } from "react";
import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";
import { useMealPlanAddMutation } from "@/redux/features/MealPlanSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MealItem {
  name: string;
  quantity: string;
}

interface Plan {
  day: number;
  breakfast: { items: MealItem[]; time: string };
  midMorningSnack?: { items: MealItem[]; time: string };
  lunch: { items: MealItem[]; time: string };
  afternoonSnack?: { items: MealItem[]; time: string };
  dinner: { items: MealItem[]; time: string };
  calories: number;
  carb: number;
  protein: number;
  fiber: number;
  fat: number;
  isCompleted?: boolean;
}

interface MealPlan {
  planName: string;
  plans: Plan[];
}

const NutritionPlan = () => {
  const [mealPlanData, setMealPlanData] = useState<MealPlan | null>(null);
  const [mealPlanAdd, { isLoading, isError, isSuccess }] =
    useMealPlanAddMutation();

  // Load meal plan from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMealPlan = localStorage.getItem("mealPlan");
      if (storedMealPlan) {
        try {
          const parsedData = JSON.parse(storedMealPlan);
          console.log("Parsed Data:", parsedData);
          setMealPlanData(parsedData);
        } catch (error) {
          console.error("Error parsing mealPlan data:", error);
          toast.error("Failed to load meal plan data.");
        }
      }
    }
  }, []);

  // Post data to backend
  const handleAddToPlan = async () => {
    if (!mealPlanData) {
      toast.error("No meal plan data available.");
      return;
    }

    try {
      const response = await mealPlanAdd(mealPlanData).unwrap();
      toast.success("Meal plan added successfully!");
      console.log("Meal Plan Added:", response);
    } catch (error) {
      console.error("Error adding meal plan:", error);
      toast.error("Failed to add meal plan. Please try again.");
    }
  };

  // Helper function to format meal items
  const formatMealItems = (meal: { items: MealItem[] } | undefined) => {
    if (!meal || !meal.items) return "-";
    return meal.items
      .map((item) => `${item.name} (${item.quantity})`)
      .join(", ");
  };

  return (
    <div className="">
      <NutritionPlanBanner />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto p-6">
        <div className="bg-white rounded-xl p-3">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-6">
            Plan Overview
          </h2>
          <h3 className="text-xl md:text-3xl font-semibold text-gray-700 mb-4">
            Nutrition Plan
          </h3>

          <div className="bg-white rounded-lg shadow-md p-2">
            <div className="py-4 border-b border-gray-200">
              <p className="text-lg md:text-2xl font-semibold text-gray-800">
                Focus: {mealPlanData?.planName || "Loading..."}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse text-sm md:text-base">
                <thead className="bg-indigo-50 text-gray-700">
                  <tr>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Day
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Breakfast
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Mid-Morning Snack
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Lunch
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Afternoon Snack
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Dinner
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Calories
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Carbs
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Protein
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Fiber
                    </th>
                    <th className="p-4 text-left font-semibold border-b border-gray-200">
                      Fat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mealPlanData?.plans?.length ? (
                    mealPlanData.plans.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 border  text-gray-600">
                          {item.day}
                        </td>
                        <td className="p-4 border  text-gray-600">
                          {formatMealItems(item.breakfast)}
                        </td>
                        <td className="p-4 border text-gray-600">
                          {formatMealItems(item.midMorningSnack)}
                        </td>
                        <td className="p-4 border text-gray-600">
                          {formatMealItems(item.lunch)}
                        </td>
                        <td className="p-4 border text-gray-600">
                          {formatMealItems(item.afternoonSnack)}
                        </td>
                        <td className="p-4 border text-gray-600">
                          {formatMealItems(item.dinner)}
                        </td>
                        <td className="p-4 border text-gray-600">
                          {item.calories} kcal
                        </td>
                        <td className="p-4 border text-gray-600">
                          {item.carb}g
                        </td>
                        <td className="p-4 border text-gray-600">
                          {item.protein}g
                        </td>
                        <td className="p-4 border text-gray-600">
                          {item.fiber}g
                        </td>
                        <td className="p-4 border text-gray-600">
                          {item.fat}g
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={11}
                        className="p-4 text-center text-gray-500"
                      >
                        No meal plan data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add to Plan Button */}
          <div className="mt-8 flex justify-end">
            <button
              className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition-colors ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              onClick={handleAddToPlan}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add to Plan"}
            </button>
          </div>

          {/* Success/Error Messages */}
          {isSuccess && (
            <p className="mt-4 text-green-600 font-medium">
              Plan successfully added!
            </p>
          )}
          {isError && (
            <p className="mt-4 text-red-600 font-medium">
              Error adding plan. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionPlan;
