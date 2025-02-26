

"use client";

import React from "react";
import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";


const NutritionPlan = () => {
  const planData = [
    {
      day: "Day 1",
      meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
      calories: "2000 kcal",
      carbs: "250g",
      protein: "90g",
      fiber: "35g",
      fat: "70g",
    },
    {
      day: "Day 2",
      meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
      calories: "2000 kcal",
      carbs: "250g",
      protein: "90g",
      fiber: "35g",
      fat: "70g",
    },
    {
      day: "Day 2",
      meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
      calories: "2000 kcal",
      carbs: "250g",
      protein: "90g",
      fiber: "35g",
      fat: "70g",
    },
    {
      day: "Day 2",
      meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
      calories: "2000 kcal",
      carbs: "250g",
      protein: "90g",
      fiber: "35g",
      fat: "70g",
    },
    {
      day: "Day 2",
      meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
      calories: "2000 kcal",
      carbs: "250g",
      protein: "90g",
      fiber: "35g",
      fat: "70g",
    },
  ];




  return (
    <div>
      <NutritionPlanBanner></NutritionPlanBanner>

      <div className="container mx-auto p-6 ">
        <div className="bg-white   ">
          <h2 className="text-center lg:text-[48px]  text-[30px] font-semibold">Plan Overview</h2>
          <h3 className="lg:text-[32px] text-[18px] font-semibold mt-6">Nutrition Plan</h3>

          <div className="mt-6 bg-white   overflow-hidden shadow-xl p-4 rounded-lg ">
            <div className="rounded-lg bg-white ">
              <div className=" py-6 border-b ">
                <p className="text-[#000000] lg:text-[24px] font-semibold">
                  Focus: Balanced Nutrition for a Healthier Lifestyle.
                </p>
              </div>
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse ">
                  <thead className="bg-[#E6EBF1]  text-gray-700 text-left">
                    <tr>
                      <th className="p-3 border">Day</th>
                      <th className="p-3 border">Meal Plan</th>
                      <th className="p-3 border">Calories</th>
                      <th className="p-3 border">Carbs</th>
                      <th className="p-3 border">Protein</th>
                      <th className="p-3 border">Fiber</th>
                      <th className="p-3 border">Fat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 border">{item.day}</td>
                        <td className="p-3 border whitespace-pre-wrap">
                          {item.meal}
                        </td>
                        <td className="p-3 border">{item.calories}</td>
                        <td className="p-3 border">{item.carbs}</td>
                        <td className="p-3 border">{item.protein}</td>
                        <td className="p-3 border">{item.fiber}</td>
                        <td className="p-3 border">{item.fat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button className="px-14 py-4 bg-[#01336F] text-white rounded-lg shadow ">
            Add to Plan
          </button>
        </div>
      </div>

    </div>
  );
};

export default NutritionPlan;
