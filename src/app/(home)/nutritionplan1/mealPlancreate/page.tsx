// "use client";

// import React, { useEffect, useState } from "react";
// import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";

// const NutritionPlan = () => {
//   const [mealPlanData, setMealPlanData] = useState({});
//   const planData = [
//     {
//       day: "Day 1",
//       meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
//       calories: "2000 kcal",
//       carbs: "250g",
//       protein: "90g",
//       fiber: "35g",
//       fat: "70g",
//     },
//     {
//       day: "Day 2",
//       meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
//       calories: "2000 kcal",
//       carbs: "250g",
//       protein: "90g",
//       fiber: "35g",
//       fat: "70g",
//     },
//     {
//       day: "Day 2",
//       meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
//       calories: "2000 kcal",
//       carbs: "250g",
//       protein: "90g",
//       fiber: "35g",
//       fat: "70g",
//     },
//     {
//       day: "Day 2",
//       meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
//       calories: "2000 kcal",
//       carbs: "250g",
//       protein: "90g",
//       fiber: "35g",
//       fat: "70g",
//     },
//     {
//       day: "Day 2",
//       meal: "Breakfast: Oatmeal with honey and nuts\nLunch: Grilled chicken with quinoa and steamed broccoli\nDinner: Baked salmon with roasted sweet potatoes and a side salad",
//       calories: "2000 kcal",
//       carbs: "250g",
//       protein: "90g",
//       fiber: "35g",
//       fat: "70g",
//     },
//   ];

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedMealPlan = localStorage.getItem("mealPlan");
//       if (storedMealPlan) {
//         try {
//           setMealPlanData(JSON.parse(storedMealPlan));
//         } catch (error) {
//           console.error("Error parsing mealPlan data:", error);
//         }
//       }
//     }
//   }, []);
//   console.log(mealPlanData ,'mealPlanData');

//   return (
//     <div>
//       <NutritionPlanBanner></NutritionPlanBanner>

      // <div className="container mx-auto p-6 ">
      //   <div className="bg-white   ">
      //     <h2 className="text-center lg:text-[48px]  text-[30px] font-semibold">
      //       Plan Overview
      //     </h2>
      //     <h3 className="lg:text-[32px] text-[18px] font-semibold mt-6">
      //       Nutrition Plan
      //     </h3>

      //     <div className="mt-6 bg-white   overflow-hidden shadow-xl p-4 rounded-lg ">
      //       <div className="rounded-lg bg-white ">
      //         <div className=" py-6 border-b ">
      //           <p className="text-[#000000] lg:text-[24px] font-semibold">
      //             Focus: Balanced Nutrition for a Healthier Lifestyle.
      //           </p>
      //         </div>
      //         <div className="overflow-x-auto rounded-lg">
      //           <table className="min-w-full border-collapse ">
      //             <thead className="bg-[#E6EBF1]  text-gray-700 text-left">
      //               <tr>
      //                 <th className="p-3 border">Day</th>
      //                 <th className="p-3 border">Meal Plan</th>
      //                 <th className="p-3 border">Calories</th>
      //                 <th className="p-3 border">Carbs</th>
      //                 <th className="p-3 border">Protein</th>
      //                 <th className="p-3 border">Fiber</th>
      //                 <th className="p-3 border">Fat</th>
      //               </tr>
      //             </thead>
      //             <tbody>
      //               {planData.map((item, index) => (
      //                 <tr key={index} className="border-b hover:bg-gray-50">
      //                   <td className="p-3 border">{item.day}</td>
      //                   <td className="p-3 border whitespace-pre-wrap">
      //                     {item.meal}
      //                   </td>
      //                   <td className="p-3 border">{item.calories}</td>
      //                   <td className="p-3 border">{item.carbs}</td>
      //                   <td className="p-3 border">{item.protein}</td>
      //                   <td className="p-3 border">{item.fiber}</td>
      //                   <td className="p-3 border">{item.fat}</td>
      //                 </tr>
      //               ))}
      //             </tbody>
      //           </table>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
//         <div className="mt-10 flex justify-end">
//           <button className="px-14 py-4 bg-[#01336F] text-white rounded-lg shadow ">
//             Add to Plan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NutritionPlan;

// "use client";

// import React, { useEffect, useState } from "react";
// import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";
// import { useMealPlanAddMutation } from "@/redux/features/MealPlanSlice";

// const NutritionPlan = () => {
//   const [mealPlanData, setMealPlanData] = useState<any>(null);

//   const [mealPlanAdd]= useMealPlanAddMutation()

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedMealPlan = localStorage.getItem("mealPlan");
//       if (storedMealPlan) {
//         try {
//           setMealPlanData(JSON.parse(storedMealPlan));
//         } catch (error) {
//           console.error("Error parsing mealPlan data:", error);
//         }
//       }
//     }
//   }, []);

//   console.log(mealPlanData, "mealPlanData");

//   return (
//     <div>
//       <NutritionPlanBanner />

//       <div className="container mx-auto p-6">
//         <div className="bg-white">
//           <h2 className="text-center lg:text-[48px] text-[30px] font-semibold">
//             Plan Overview
//           </h2>
//           <h3 className="lg:text-[32px] text-[18px] font-semibold mt-6">
//             Nutrition Plan
//           </h3>

//           <div className="mt-6 bg-white overflow-hidden shadow-xl p-4 rounded-lg">
//             <div className="rounded-lg bg-white">
//               <div className="py-6 border-b">
//                 <p className="text-[#000000] lg:text-[24px] font-semibold">
//                   Focus: {mealPlanData?.planName}
//                 </p>
//               </div>

//               {/* Table */}
//               <div className="overflow-x-auto rounded-lg">
//                 <table className="min-w-full border-collapse">
//                   <thead className="bg-[#E6EBF1] text-gray-700 text-left">
//                     <tr>
//                       <th className="p-6 border">Day</th>
//                       <th className="p-3 border">Breakfast</th>
//                       <th className="p-3 border">Lunch</th>
//                       <th className="p-3 border">Dinner</th>
//                       <th className="p-3 border">Calories</th>
//                       <th className="p-3 border">Carbs</th>
//                       <th className="p-3 border">Protein</th>
//                       <th className="p-3 border">Fiber</th>
//                       <th className="p-3 border">Fat</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {mealPlanData?.plans?.map((item: any, index: number) => (
//                       <tr key={index} className="border-b hover:bg-gray-50">
//                         <td className="p-3 border">Day {item.day}</td>
//                         <td className="p-3 border whitespace-pre-wrap">
//                           {item.breakfast}
//                         </td>
//                         <td className="p-3 border whitespace-pre-wrap">
//                           {item.lunch}
//                         </td>
//                         <td className="p-3 border whitespace-pre-wrap">
//                           {item.dinner}
//                         </td>
//                         <td className="p-3 border">{item.calories} kcal</td>
//                         <td className="p-3 border">{item.carb}g</td>
//                         <td className="p-3 border">{item.protein}g</td>
//                         <td className="p-3 border">{item.fiber}g</td>
//                         <td className="p-3 border">{item.fat}g</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Button */}
//           <div className="mt-10 flex justify-end">
//             <button className="px-14 py-4 bg-[#01336F] text-white rounded-lg shadow">
//               Add to Plan
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NutritionPlan;

"use client";

import React, { useEffect, useState } from "react";
import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";
import { useMealPlanAddMutation } from "@/redux/features/MealPlanSlice";
import { toast, ToastContainer } from "react-toastify";

interface MealPlan {
  planName: string;
  plans: {
    day: number;
    breakfast: string;
    midMorningSnack?: string;
    lunch: string;
    afternoonSnack?: string;
    dinner: string;
    calories: number;
    carb: number;
    protein: number;
    fiber: number;
    fat: number;
    isCompleted: boolean;
  }[];
}

const NutritionPlan = () => {
  const [mealPlanData, setMealPlanData] = useState<MealPlan | null>(null);
  const [mealPlanAdd, { isLoading, isError, isSuccess }] =
    useMealPlanAddMutation();

  // Load Meal Plan from localStorage on Component Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMealPlan = localStorage.getItem("mealPlan");
      if (storedMealPlan) {
        try {
          setMealPlanData(JSON.parse(storedMealPlan));
        } catch (error) {
          console.error("Error parsing mealPlan data:", error);
        }
      }
    }
  }, []);

  // ✅ Function to Post Data to Backend
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

  return (
    <div>
      <NutritionPlanBanner />

      <ToastContainer></ToastContainer>
      <div className="container mx-auto p-6">
        <div className="bg-white">
          <h2 className="text-center lg:text-[48px] text-[30px] font-semibold">
            Plan Overview
          </h2>
          <h3 className="lg:text-[32px] text-[18px] font-semibold mt-6">
            Nutrition Plan
          </h3>

          <div className="mt-6 bg-white overflow-hidden shadow-xl p-4 rounded-lg">
            <div className="rounded-lg bg-white">
              <div className="py-6 border-b">
                <p className="text-[#000000] lg:text-[24px] font-semibold">
                  Focus: {mealPlanData?.planName}
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#E6EBF1] text-gray-700 text-left">
                    <tr>
                      <th className="p-6 border">Day</th>
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
                    {mealPlanData?.plans?.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 border">Day {item.day}</td>
                        <td className="p-3 border whitespace-pre-wrap">
                          {item.breakfast}
                        </td>
                        <td className="p-3 border whitespace-pre-wrap">
                          {item.midMorningSnack || "-"}
                        </td>
                        <td className="p-3 border whitespace-pre-wrap">
                          {item.lunch}
                        </td>
                        <td className="p-3 border whitespace-pre-wrap">
                          {item.afternoonSnack || "-"}
                        </td>
                        <td className="p-3 border whitespace-pre-wrap">
                          {item.dinner}
                        </td>
                        <td className="p-3 border">{item.calories} kcal</td>
                        <td className="p-3 border">{item.carb}g</td>
                        <td className="p-3 border">{item.protein}g</td>
                        <td className="p-3 border">{item.fiber}g</td>
                        <td className="p-3 border">{item.fat}g</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add to Plan Button */}
          <div className="mt-10 flex justify-end">
            <button
              className="px-14 py-4 bg-[#01336F] text-white rounded-lg shadow"
              onClick={handleAddToPlan}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add to Plan"}
            </button>
          </div>

          {/* Success/Error Messages */}
          {isSuccess && (
            <p className="text-green-600 mt-4">Plan successfully added!</p>
          )}
          {isError && (
            <p className="text-red-600 mt-4">Error adding plan. Try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionPlan;
