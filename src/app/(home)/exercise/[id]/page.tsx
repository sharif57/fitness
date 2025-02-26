// "use client";
// import { useWorkPlanDetailsQuery } from "@/redux/features/workSlice";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// export default function Page() {
//   const params = useParams(); // Get the params as a Promise
//   const [workoutId, setWorkoutId] = useState<string | null>(null);
//   const { data: workPlanDetails } = useWorkPlanDetailsQuery(undefined);
//   console.log(workPlanDetails);

//   useEffect(() => {
//     if (params?.id) {
//       setWorkoutId(params.id as string);
//     }
//   }, [params]);
//   console.log(workoutId, "workoutplan");

//   const workoutPlan = workPlanDetails?.data?.workouts || [];
//   console.log(workoutPlan);

//   return (
//     <div>
//       <div className="container mx-auto lg:p-6 p-2 mb-16">
//         <h1 className="lg:text-[48px] text-3xl font-semibold text-center my-10 text-[#000000]">
//           Plan Overview
//         </h1>

//         {/* Header */}
//         <h1 className="lg:text-[32px] text-2xl font-semibold mb-4">
//           Workout Plan
//         </h1>

//         {/* Content */}
//         <div className="bg-white shadow-lg rounded-lg lg:p-6 mt-4">
//           <h2 className="text-lg font-semibold">
//             Focus:{" "}
//             {workPlanDetails?.data?.description ||
//               "Build strength and establish consistency."}
//           </h2>

//           {/* Workout Plan Table */}
//           <div className="mt-4 max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg custom-scrollbar">
//             <table className="w-full border-collapse">
//               <thead className="sticky top-0 bg-[#e6ebf1] z-10">
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-6 text-left w-1/6">
//                     Day
//                   </th>
//                   <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
//                     Warm-up
//                   </th>
//                   <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
//                     Main Workout
//                   </th>
//                   <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
//                     Cool Down
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {workoutPlan.map((day: WorkoutDay) => (
//                   <tr key={day._id} className="border border-r border-gray-300">
//                     <th className="px-4 py-3 font-semibold text-left text-[#545454] border-r">
//                       Day {day.day}
//                     </th>
//                     <td className="px-4 py-3 border border-r border-gray-300">
//                       {day.warmUp.exercises.map((exercise) => (
//                         <p key={exercise._id} className="text-gray-600">
//                           {exercise.exerciseName}
//                         </p>
//                       ))}
//                     </td>
//                     <td className="px-4 py-3 border border-r border-gray-300">
//                       {day.mainWorkout.exercises.map((exercise) => (
//                         <p key={exercise._id} className="text-gray-600">
//                           {exercise.exerciseName}
//                         </p>
//                       ))}
//                     </td>
//                     <td className="px-4 py-3">
//                       {day.coolDown.exercises.map((exercise) => (
//                         <p key={exercise._id} className="text-gray-600">
//                           {exercise.exerciseName}
//                         </p>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Add to Plan Button */}
//         {/* <div className="flex justify-end mt-16">
//           <button
//             onClick={() => data?.data?._id && handleAddToPlan(data.data._id)}
//             className="px-10 py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition"
//           >
//             Add to Plan
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// }

"use client";
import LoadingSkeleton from "@/components/loadingSkeleton";
import PlanOverview from "@/components/PlanOverview";
import { useBookAppointmentMutation } from "@/redux/features/userworkplanSlice";
import { useWorkPlanDetailsQuery } from "@/redux/features/workSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// Define types for WorkoutPlan and WorkoutDay
type Exercise = {
  _id: string;
  exerciseName: string;
  gifImage?: string;
  description: string;
  isDeleted: boolean;
};

type WorkoutDay = {
  _id: string;
  day: number;
  isCompleted: boolean;
  warmUp: {
    duration: number;
    exercises: Exercise[];
    _id: string;
  };
  mainWorkout: {
    duration: number;
    exercises: Exercise[];
    _id: string;
  };
  coolDown: {
    duration: number;
    exercises: Exercise[];
    _id: string;
  };
};

// type WorkPlanDetails = {
//   data: {
//     description: string;
//     planName: string;
//     rating: number;
//     workouts: WorkoutDay[];
//   };
//   message: string;
//   success: boolean;
// };

export default function Page() {
  const params = useParams(); // Get the params
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  // Use the workoutId to fetch the specific workout plan details
  const {
    data: workPlanDetails,
    error,
    isLoading,
  } = useWorkPlanDetailsQuery(workoutId);
  const [bookAppointment] = useBookAppointmentMutation(); // Use the mutation hook

  useEffect(() => {
    if (params?.id) {
      setWorkoutId(params.id as string); // Set the workoutId from params
    }
  }, [params]);

  if (error) return <div>Error fetching workout plan details.</div>; // Error handling

  const workoutPlan = workPlanDetails?.data?.workouts || [];

  const handleAddToPlan = async (workoutPlanId: string) => {
    try {
      const result = await bookAppointment({ workoutPlanId }).unwrap();
      console.log("Appointment booked successfully:", result);

      // ✅ Show success toast
      toast.success(result?.message || "Success", {
        position: "top-center",
        autoClose: 1000, // Toast disappears in 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.error("Failed to book appointment:", err);

      // ❌ Show error toast
      toast.error("Failed to plan added. Please try again.", {
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
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <ToastContainer></ToastContainer>
          <PlanOverview></PlanOverview>
          <div className="container mx-auto lg:p-6 p-2 mb-16 mt-5">
          

            {/* Content */}
            <div className="bg-white shadow-lg rounded-lg lg:p-6 mt-4">
              <h2 className="text-lg font-semibold">
                <span className="text-[#01336F]">Focus:</span>{" "}
                {workPlanDetails?.data?.title ||
                  "Build strength and establish consistency."}
              </h2>

              {/* Workout Plan Table */}
              <div className="mt-4 max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg custom-scrollbar">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-[#e6ebf1] z-10">
                    <tr>
                      <th className="border border-gray-300 px-4 py-6 text-left w-1/6">
                        Day
                      </th>
                      <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                        Warm-up
                      </th>
                      <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                        Main Workout
                      </th>
                      <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                        Cool Down
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutPlan.map((day: WorkoutDay) => (
                      <tr
                        key={day._id}
                        className="border border-r border-gray-300"
                      >
                        <th className="px-4 py-3 font-semibold text-left text-[#545454] border-r">
                          Day {day.day}
                        </th>
                        <td className="px-4 py-3 border border-r border-gray-300">
                          {day.warmUp.exercises.map((exercise) => (
                            <p key={exercise._id} className="text-gray-600">
                              {exercise.exerciseName}
                            </p>
                          ))}
                        </td>
                        <td className="px-4 py-3 border border-r border-gray-300">
                          {day.mainWorkout.exercises.map((exercise) => (
                            <p key={exercise._id} className="text-gray-600">
                              {exercise.exerciseName}
                            </p>
                          ))}
                        </td>
                        <td className="px-4 py-3">
                          {day.coolDown.exercises.map((exercise) => (
                            <p key={exercise._id} className="text-gray-600">
                              {exercise.exerciseName}
                            </p>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add to Plan Button */}
            <div className="flex justify-end mt-16">
              <button
                onClick={() =>
                  workPlanDetails?.data?._id &&
                  handleAddToPlan(workPlanDetails.data._id)
                }
                className="px-10 py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition"
              >
                Add to Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
