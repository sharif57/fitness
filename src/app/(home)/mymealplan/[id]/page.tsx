// "use client";
// import { useMealPlanDetailsQuery } from "@/redux/features/MealPlanSlice";
// import { useParams } from "next/navigation";
// import React from "react";

// export default function MealPlanDetails() {
//   const params = useParams();
//   const id = params?.id as string;
//   const { data } = useMealPlanDetailsQuery(id);
//   console.log("Meal Plan Details Data:", data);

//   interface MealPlanItem {
//     _id: string;
//     day: string;
//     breakfast: string;
//     midMorningSnack: string;
//     lunch: string;
//     afternoonSnack: string;
//     dinner: string;
//     calories: number;
//     carb: number;
//     protein: number;
//     fiber: number;
//     fat: number;
//   }
  
//   const planData: MealPlanItem[] = data?.data?.plans || [];
  
//   return (
//     <div>
//       <div className="container mx-auto p-6">
//         <div className="bg-white">
//           <h2 className="text-center lg:text-[48px] text-[30px] font-semibold">
//             Plan Overview
//           </h2>
//           <h3 className="lg:text-[32px] text-[18px] font-semibold mt-6">
//             {data?.data?.planName || "Nutrition Plan"}
//           </h3>

//           <div className="mt-6 bg-white overflow-hidden shadow-xl p-4 rounded-lg">
//             <div className="rounded-lg bg-white">
//               <div className="py-6 border-b">
//                 <p className="text-[#000000] lg:text-[24px] font-semibold">
//                   Focus: Balanced Nutrition for a Healthier Lifestyle.
//                 </p>
//               </div>
//               <div className="overflow-x-auto rounded-lg">
//                 <table className="min-w-full border-collapse">
//                   <thead className="bg-[#E6EBF1] text-gray-700 text-left">
//                     <tr>
//                       <th className="p-3 border">Day</th>
//                       <th className="p-3 border">Breakfast</th>
//                       <th className="p-3 border">Mid-Morning Snack</th>
//                       <th className="p-3 border">Lunch</th>
//                       <th className="p-3 border">Afternoon Snack</th>
//                       <th className="p-3 border">Dinner</th>
//                       <th className="p-3 border">Calories</th>
//                       <th className="p-3 border">Carbs</th>
//                       <th className="p-3 border">Protein</th>
//                       <th className="p-3 border">Fiber</th>
//                       <th className="p-3 border">Fat</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {planData.map((item) => (
//                       <tr key={item._id} className="border-b hover:bg-gray-50">
//                         <td className="p-3 border">{item.day}</td>
//                         <td className="p-3 border">{item.breakfast}</td>
//                         <td className="p-3 border">{item.midMorningSnack}</td>
//                         <td className="p-3 border">{item.lunch}</td>
//                         <td className="p-3 border">{item.afternoonSnack}</td>
//                         <td className="p-3 border">{item.dinner}</td>
//                         <td className="p-3 border">{item.calories}</td>
//                         <td className="p-3 border">{item.carb}</td>
//                         <td className="p-3 border">{item.protein}</td>
//                         <td className="p-3 border">{item.fiber}</td>
//                         <td className="p-3 border">{item.fat}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {planData.length === 0 && (
//                 <p className="text-center text-gray-500 mt-4">
//                   No meal plan data available.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useMealPlanDetailsQuery } from "@/redux/features/MealPlanSlice";
import { useParams } from "next/navigation";
import React from "react";

interface MealItem {
  name: string;
  quantity: string;
  _id: string;
}

interface Meal {
  items: MealItem[];
  time: string;
  _id: string;
}

interface MealPlanItem {
  _id: string;
  day: number;
  breakfast: Meal;
  midMorningSnack: Meal;
  lunch: Meal;
  afternoonSnack: Meal;
  dinner: Meal;
  calories: number;
  carb: number;
  protein: number;
  fiber: number;
  fat: number;
  isCompleted: boolean;
}

export default function MealPlanDetails() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError } = useMealPlanDetailsQuery(id);

  const planData: MealPlanItem[] = data?.data?.plans || [];
  const planName = data?.data?.planName || "Nutrition Plan";

  // Function to format meal items into a string for display
  const formatMealItems = (meal: Meal) => {
    return meal.items.map((item) => `${item.name} (${item.quantity})`).join(", ");
  };

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (isError || !data?.success) {
    return <div className="text-center p-6 text-red-500">Error loading meal plan.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Plan Overview
        </h2>
        <h3 className="text-xl md:text-3xl font-semibold text-gray-700 mb-6">
          {planName}
        </h3>

        <div className="mt-6">
          <div className="py-4 border-b border-gray-200">
            <p className="text-lg md:text-2xl font-semibold text-gray-800">
              Focus: Balanced Nutrition for a Healthier Lifestyle
            </p>
          </div>
          <div className="overflow-x-auto">
            <table
              className="min-w-full border-collapse rounded-lg overflow-hidden"
              aria-label="Meal Plan Details"
            >
              <thead className="bg-gray-100 text-gray-700 text-left text-sm md:text-base">
                <tr>
                  <th className="p-4 border-b border-gray-200 font-semibold">Day</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Breakfast</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Mid-Morning Snack</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Lunch</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Afternoon Snack</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Dinner</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Calories</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Carbs (g)</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Protein (g)</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Fiber (g)</th>
                  <th className="p-4 border-b border-gray-200 font-semibold">Fat (g)</th>
                </tr>
              </thead>
              <tbody>
                {planData.map((item) => (
                  <tr
                    // Divided by 2
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-labelledby={`day-${item.day}`}
                  >
                    <td className="p-4 border-r border-l border-gray-200 text-gray-600">
                      Day {item.day}
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {formatMealItems(item.breakfast)}
                      <br />
                      <span className="text-sm text-gray-500">({item.breakfast.time})</span>
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {formatMealItems(item.midMorningSnack)}
                      <br />
                      <span className="text-sm text-gray-500">
                        ({item.midMorningSnack.time})
                      </span>
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {formatMealItems(item.lunch)}
                      <br />
                      <span className="text-sm text-gray-500">({item.lunch.time})</span>
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {formatMealItems(item.afternoonSnack)}
                      <br />
                      <span className="text-sm text-gray-500">({item.afternoonSnack.time})</span>
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {formatMealItems(item.dinner)}
                      <br />
                      <span className="text-sm text-gray-500">({item.dinner.time})</span>
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {item.calories}
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">{item.carb}</td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">
                      {item.protein}
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">{item.fiber}</td>
                    <td className="p-4 border-r border-gray-200 text-gray-600">{item.fat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {planData.length === 0 && (
              <p className="text-center text-gray-500 mt-6 text-lg">
                No meal plan data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}