// "use client";
// import { useAllWorkoutPlanQuery } from "@/redux/features/planWorkoutSlice";
// import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
// import Link from "next/link";
// import React from "react";
// interface Workout {
//   _id: string;
//   name: string;
//   title: string;
//   description: string;
//   image: string;
// }

// export default function WorkoutPlan() {
//   const { data } = useAllWorkoutPlanQuery(undefined);
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
//   const { data: userSubscription } = useSubscriptionGetQuery(undefined);
//   return (
//     <div>
//       <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px] min-h-screen">
//         {/* Plans Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {data?.data?.data?.map((plan: Workout) => (
//             <div
//               key={plan.name}
//               className="bg-white p-4 shadow-lg rounded-xl overflow-hidden flex flex-col h-full"
//             >
//               {/* Image & Rating */}
//               <div className="relative">
//                 <img
//                   src={`${API_BASE_URL}${plan.image}`}
//                   alt={plan.title}
//                   className="w-full object-cover rounded-lg h-[290px]"
//                 />
//               </div>

//               {/* Content */}
//               <div className="pt-5 space-y-2 flex-grow">
//                 <div className="flex justify-between items-center">
//                   <h3 className="lg:text-[24px] text-[18px] font-medium">
//                     {plan.name}
//                   </h3>
//                 </div>
//                 <p className="text-gray-500 text-[16px]">{plan.title}</p>
//               </div>

//               {/* Buttons */}
//               <div className="pt-4 flex justify-between gap-4">
//                 {userSubscription?.data?.package?.name === "workout" ||
//                 userSubscription?.data?.package?.name ===
//                   "workout & nutrition" ? (
//                   <Link
//                     href={`/plan_workout/${plan._id}`}
//                     className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
//                   >
//                     Read More
//                   </Link>
//                 ) : (
//                   <Link
//                     href="/subscription1"
//                     className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
//                   >
//                     Read More
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useAllWorkoutPlanQuery } from "@/redux/features/planWorkoutSlice";
import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
import Link from "next/link";

interface Workout {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

export default function WorkoutPlan() {
  // State to manage the current page
  const [page, setPage] = useState(1);
  const limit = 9; // Fixed limit based on API response (pageSize: 2)

  // Fetch workout plans with pagination parameters
  const { data, isLoading, isError } = useAllWorkoutPlanQuery({ page, limit });
  const { data: userSubscription } = useSubscriptionGetQuery(undefined);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching workout plans</div>;
  }

  // Extract workout plans and metadata from the response
  const responseData = data?.data || {};
  const workoutPlans = responseData.data || [];
  const meta = responseData.meta || {};
  const totalPages = meta.totalPages || 1;

  // Pagination navigation functions
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <div>
      <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px] min-h-screen">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workoutPlans.map((plan: Workout) => (
            <div
              key={plan._id} // Use _id for uniqueness instead of name
              className="bg-white p-4 shadow-lg rounded-xl overflow-hidden flex flex-col h-full"
            >
              {/* Image & Rating */}
              <div className="relative">
                <img
                  src={`${API_BASE_URL}${plan.image}`}
                  alt={plan.title}
                  className="w-full object-cover rounded-lg h-[290px]"
                />
              </div>

              {/* Content */}
              <div className="pt-5 space-y-2 flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="lg:text-[24px] text-[18px] font-medium">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-gray-500 text-[16px]">{plan.title}</p>
              </div>

              {/* Buttons */}
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

        {/* Pagination Controls */}
        <div className="pagination mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
