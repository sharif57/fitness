"use client";
import CardAllSkeleton from "@/components/common/Skeleton/CardAllSkeleton";
// import Link from "next/link";
// import React, { useCallback, useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// interface Workout {
//   _id: string;
//   day: number;
//   isCompleted: boolean;
// }

// interface WorkoutPlan {
//   _id: string;
//   planName: string;
//   description: string;
//   image: string;
//   workouts: Workout[];
//   totalDays: number;
// }

// interface Package {
//   package: {
//     _id: string;
//     name: string;
//     unitAmount: number;
//     interval: string;
//   };
// }

// const SelectWorkoutPlan: React.FC = () => {

//   const [clientData, setClientData] = useState<WorkoutPlan[]>([]);
//   const [subscriptionData, setSubscriptionData] = useState<Package>();
//   const [addToCart, setAddToCart] = useState();
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(
//         `${API_BASE_URL}/api/v1/workout-plan/all-workout-plan`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setClientData(data.data);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const subData = async () => {
//       const res = await fetch(
//         `${API_BASE_URL}/api/v1/subscription/get-user-subscripton`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setSubscriptionData(data.data);
//     };

//     subData();
//   }, []);

//   const addWorkoutPlan = useCallback(async (workoutPlanId: string) => {
//     const res = await fetch(
//       `${API_BASE_URL}/api/v1/work-plan/user-add-work-plan`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify({ workoutPlanId }),
//       }
//     );
//     const data = await res.json();
//     setAddToCart(data.data);
//     return data;
//   }, []);

//   if (!clientData) {
//     return <div>Loading...</div>;
//   }

//   const handleAddToPlan = async (workoutPlanId: string) => {
//     try {
//       const result = await addWorkoutPlan(workoutPlanId);
//       console.log("Workout plan added successfully:", result);

//       // ✅ Show success toast
//       toast.success(result?.message || "Workout plan added successfully!", {
//         autoClose: 1000, // Toast disappears in 1 second
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.error("Failed to add workout plan:", err);

//       // ❌ Show error toast
//       toast.error("Failed to add workout plan. Please try again.", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="lg:px-6 md:px-12  py-10 mx-auto max-w-[1580px]">
//         <ToastContainer></ToastContainer>
//         {/* Header */}
//         <div className="flex justify-center items-center mb-10">
//           <h2 className="lg:text-[40px] text-2xl text-center  font-semibold">
//             Select Your Workout Plan
//           </h2>
//         </div>

//         {/* Plans Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {clientData.map((plan) => (
//             <div
//               key={plan._id}
//               className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
//             >
//               {/* Image */}
//               <div className="relative">
//                 <img
//                   src={`${API_BASE_URL}${plan.image}`}
//                   alt={plan.planName}
//                   className="w-full object-cover h-[290px] rounded-lg"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-4 space-y-2">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-[24px] font-medium">{plan.planName}</h3>
//                   <h3 className="text-lg font-semibold text-[#545454]">
//                     {plan.workouts.length > 0
//                       ? `Day: ${plan.totalDays}`
//                       : "No Workouts"}
//                   </h3>
//                 </div>
//                 {/* <p className="text-gray-500 text-sm">{plan.description}</p> */}
//                 <p className="text-gray-500 text-sm">
//                   {plan.description.slice(0, 160)}...
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="p-4 flex justify-between gap-4">
//                 {subscriptionData?.package?.name === "workout" ||
//                 subscriptionData?.package?.name === "workout & nutrition" ? (
//                   <Link
//                     href={`/workoutplan1/${plan._id}`}
//                     className="w-1/2 py-2 lg:text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition"
//                   >
//                     <button>See Details</button>
//                   </Link>
//                 ) : (
//                   <Link
//                     href={`/workoutplan1/${plan._id}`}
//                     className="w-1/2 py-2 lg:text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition"
//                   >
//                     <button disabled>See Details</button>
//                   </Link>
//                 )}
//                 {subscriptionData?.package?.name === "workout" ||
//                 subscriptionData?.package?.name === "workout & nutrition" ? (
//                   <button
//                     onClick={() => handleAddToPlan(plan._id)}
//                     className="w-1/2 py-2 lg:text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition"
//                   >
//                     Add to Plan
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleAddToPlan(plan._id)}
//                     disabled
//                     className="w-1/2 py-2 lg:text-[18px] font-normal bg-gray-400 text-white rounded-lg transition"
//                   >
//                     Add to Plan
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SelectWorkoutPlan;


import {
  NotificationContext,
  NotificationContextProps,
} from "@/Providers/NotifyNotificationChange";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Workout {
  _id: string;
  day: number;
  isCompleted: boolean;
}

interface WorkoutPlan {
  _id: string;
  planName: string;
  description: string;
  image: string;
  workouts: Workout[];
  totalDays: number;
}

interface Package {
  package: {
    _id: string;
    name: string;
    unitAmount: number;
    interval: string;
  };
}

const SelectWorkoutPlan: React.FC = () => {
  const context = useContext(
    NotificationContext
  ) as NotificationContextProps;
  const [clientData, setClientData] = useState<WorkoutPlan[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<Package>();
  const [loadingClient, setLoadingClient] = useState(true);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [addToCart, setAddToCart] = useState();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/workout-plan/all-workout-plan`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const data = await res.json();
        setClientData(data.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      } finally {
        setLoadingClient(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const subData = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1/subscription/get-user-subscripton`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const data = await res.json();
        setSubscriptionData(data.data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      } finally {
        setLoadingSubscription(false); // Stop loading
      }
    };

    subData();
  }, []);

  const addWorkoutPlan = useCallback(async (workoutPlanId: string) => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/work-plan/user-add-work-plan`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ workoutPlanId }),
      }
    );
    const data = await res.json();
    setAddToCart(data.data);
    return data;
  }, []);

  // ✅ Show loading spinner while fetching data
  if (loadingClient || loadingSubscription) {
    return (
      <div className="">
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div> */}
        <CardAllSkeleton />
      </div>
    );
  }

  const handleAddToPlan = async (workoutPlanId: string) => {
    try {
      const result = await addWorkoutPlan(workoutPlanId);
      console.log("Workout plan added successfully:", result);

      // ✅ Show success toast
      toast.success(result?.message || "Workout plan added successfully!", {
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      context?.toggleNotification()
    } catch (err) {
      console.error("Failed to add workout plan:", err);

      // ❌ Show error toast
      toast.error("Failed to add workout plan. Please try again.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="lg:px-6 md:px-12 py-10 mx-auto max-w-[1580px]">
        <ToastContainer />
        {/* Header */}
        <div className="flex justify-center items-center mb-10">
          <h2 className="lg:text-[40px] text-2xl text-center font-semibold">
            Select Your Workout Plan
          </h2>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientData.map((plan) => (
            <div
              key={plan._id}
              className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={`${API_BASE_URL}${plan.image}`}
                  alt={plan.planName}
                  className="w-full object-cover h-[290px] rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-[24px] font-medium">{plan.planName}</h3>
                  <h3 className="text-lg font-semibold text-[#545454]">
                    {plan.workouts.length > 0
                      ? `Day: ${plan.totalDays}`
                      : "No Workouts"}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm">
                  {plan.description.slice(0, 160)}...
                </p>
              </div>

              {/* Buttons */}
              <div className="p-4 flex justify-between gap-4">
                {subscriptionData?.package?.name === "workout" ||
                subscriptionData?.package?.name === "workout & nutrition" ? (
                  <Link
                    href={`/workoutplan1/${plan._id}`}
                    className="w-1/2 py-2 lg:text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    <button>See Details</button>
                  </Link>
                ) : (
                  <Link
                    href={`/workoutplan1/${plan._id}`}
                    className="w-1/2 py-2 lg:text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    <button disabled>See Details</button>
                  </Link>
                )}
                {subscriptionData?.package?.name === "workout" ||
                subscriptionData?.package?.name === "workout & nutrition" ? (
                  <button
                    onClick={() => handleAddToPlan(plan._id)}
                    className="w-1/2 py-2 lg:text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition"
                  >
                    Add to Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToPlan(plan._id)}
                    disabled
                    className="w-1/2 py-2 lg:text-[18px] font-normal bg-gray-400 text-white rounded-lg transition"
                  >
                    Add to Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectWorkoutPlan;
