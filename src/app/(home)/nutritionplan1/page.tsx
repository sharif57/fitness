// "use client";

// import React from "react";
// import Appointment from "@/components/Appointment";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";
// import { useAllNutritionQuery } from "@/redux/features/nutritionSlice";
// import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
// import CardAllSkeleton from "@/components/common/Skeleton/CardAllSkeleton";
// import Link from "next/link";

// type NutritionPlan = {
//   _id: string;
//   title: string;
//   instruction?: string;
//   image: string;
//   rating: number;
// };

// export default function NutritionPlan() {
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in .env.local

//   // Fetch data from API
//   const { data, isLoading, error } = useAllNutritionQuery(undefined);
//   const { data: userSubscription } = useSubscriptionGetQuery(undefined);

//   // Extract subscription package name
//   // const userPackage = userSubscription?.data?.package?.name || "";

//   // If API call fails, show error message
//   if (error)
//     return (
//       <p className="text-center mt-10 text-red-500">
//         Failed to load nutrition plans.
//       </p>
//     );

//   const nutritionPlans: NutritionPlan[] = data?.data || [];
//   console.log("Nutrition Plans:", nutritionPlans);

//   return (
//     <div className="space-y-4">
//       <NutritionPlanBanner></NutritionPlanBanner>
//       {/* <HealthyFoodAll></HealthyFoodAll> */}

//       <div>
//         <>
//           {isLoading ? (
//             <CardAllSkeleton />
//           ) : (
//             <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
//               {/* Header */}
//               <div className="flex justify-between items-center mb-10">
//                 <h2 className="lg:text-[40px] text-[22px] font-semibold">
//                   Healthy Food
//                 </h2>
//               </div>

//               {/* Plans Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {nutritionPlans.map((plan) => {
//                   // Ensure correct image path
//                   const imageUrl = plan.image.startsWith("http")
//                     ? plan.image
//                     : `${API_BASE_URL}${plan.image}`;

//                   return (
//                     <div
//                       key={plan._id}
//                       className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
//                     >
//                       {/* Image & Rating */}
//                       <div className="relative">
//                         <img
//                           src={imageUrl}
//                           alt={plan.title}
//                           className="w-full object-cover rounded-lg h-[290px]"
//                           onError={(e) =>
//                             (e.currentTarget.src =
//                               "https://cdn-icons-png.flaticon.com/128/236/236831.png")
//                           }
//                         />
//                       </div>

//                       {/* Content */}
//                       <div className="pt-5 space-y-2">
//                         <div className="flex justify-between items-center">
//                           <h3 className="lg:text-[24px] text-[18px] font-medium">
//                             {plan.title}
//                           </h3>
//                           <span className="text-gray-600 text-[16px] font-normal flex items-center gap-2">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="24"
//                               height="24"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                             >
//                               <path
//                                 d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
//                                 fill="#FB953B"
//                               />
//                             </svg>{" "}
//                             {plan.rating}
//                           </span>
//                         </div>
//                         {/* <p className="text-gray-500 text-[16px]">
//                           {plan.instruction}
//                         </p> */}
//                         <div
//                           className="text-gray-500 text-[16px]"
//                           dangerouslySetInnerHTML={{
//                             __html: plan?.instruction ?? "",
//                           }}
//                         />
//                       </div>

//                       {/* Buttons */}
//                       <div className="pt-4 flex justify-between gap-4">
//                         {userSubscription?.data?.package?.name ===
//                           "nutrition" ||
//                         userSubscription?.data?.package?.name ===
//                           "workout & nutrition" ? (
//                           <Link
//                             href={`/nutritionplan1/${plan._id}`}
//                             className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
//                           >
//                             Read More
//                           </Link>
//                         ) : (
//                           <button
//                             className="w-full py-3 text-[18px] font-normal bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg transition text-center flex items-center justify-center"
//                             disabled
//                           >
//                             Read More
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <Pagination>
//                 <PaginationContent>
//                   <PaginationItem>
//                     <PaginationPrevious href="#" />
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink href="#">1</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink href="#" isActive>
//                       2
//                     </PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink href="#">3</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationEllipsis />
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationNext href="#" />
//                   </PaginationItem>
//                 </PaginationContent>
//               </Pagination>
//             </div>
//           )}
//         </>
//       </div>
//       <Appointment></Appointment>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Appointment from "@/components/Appointment";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NutritionPlanBanner from "@/pages/NutritionPlan/NutritionPlanBanner";
import { useAllNutritionQuery } from "@/redux/features/nutritionSlice";
import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
import CardAllSkeleton from "@/components/common/Skeleton/CardAllSkeleton";
import Link from "next/link";

type NutritionPlan = {
  _id: string;
  title: string;
  instruction?: string;
  image: string;
  rating: number;
};

export default function NutritionPlan() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

  // 1. Add state for current page
  const [page, setPage] = useState(1);

  // 2. Pass page to query
  const { data, isLoading, error } = useAllNutritionQuery(page);
  const { data: userSubscription } = useSubscriptionGetQuery(undefined);

  // If API call fails, show error message
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load nutrition plans.
      </p>
    );

  const nutritionPlans: NutritionPlan[] = data?.data || [];
  // 3. Get total pages from API if available, fallback to 3 for demo
  const totalPages = data?.totalPages || 3;

  return (
    <div className="space-y-4">
      <NutritionPlanBanner />
      <div>
        <>
          {isLoading ? (
            <CardAllSkeleton />
          ) : (
            <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="lg:text-[40px] text-[22px] font-semibold">
                  Healthy Food
                </h2>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nutritionPlans.map((plan) => {
                  // Ensure correct image path
                  const imageUrl = plan.image.startsWith("http")
                    ? plan.image
                    : `${API_BASE_URL}${plan.image}`;

                  return (
                    <div
                      key={plan._id}
                      className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
                    >
                      {/* Image & Rating */}
                      <div className="relative">
                        <img
                          src={imageUrl}
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
                            {plan.title}
                          </h3>
                          <span className="text-gray-600 text-[16px] font-normal flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                                fill="#FB953B"
                              />
                            </svg>{" "}
                            {plan.rating}
                          </span>
                        </div>
                        <div
                          className="text-gray-500 text-[16px]"
                          dangerouslySetInnerHTML={{
                            __html: plan?.instruction ?? "",
                          }}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="pt-4 flex justify-between gap-4">
                        {userSubscription?.data?.package?.name ===
                          "nutrition" ||
                        userSubscription?.data?.package?.name ===
                          "workout & nutrition" ? (
                          <Link
                            href={`/nutritionplan1/${plan._id}`}
                            className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition text-center flex items-center justify-center"
                          >
                            Read More
                          </Link>
                        ) : (
                          <button
                            className="w-full py-3 text-[18px] font-normal bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg transition text-center flex items-center justify-center"
                            disabled
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10">
                {/* Pagination */}
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        aria-disabled={page === 1}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, idx) => (
                      <PaginationItem key={idx + 1}>
                        <PaginationLink
                          href="#"
                          isActive={page === idx + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(idx + 1);
                          }}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {totalPages > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        aria-disabled={page === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </>
      </div>
      <Appointment />
    </div>
  );
}
