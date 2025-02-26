// "use client";
// import { useWorkPlanDetailsQuery } from "@/redux/features/workSlice";
// import { MessageSquareShare } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React from "react";


// const WorkoutDayPage: React.FC = () => {
//   const params = useParams();
//   const workoutPlanId = params?.id;
//   const { data, error, isLoading } = useWorkPlanDetailsQuery(workoutPlanId || '', {
//     skip: !workoutPlanId,
//   });

//   if (!workoutPlanId) {
//     console.error("Workout Plan ID is missing from the route.");
//     return <p className="text-center text-red-600 mt-10">Invalid workout plan</p>;
//   }

//   if (isLoading) {
//     return <p className="text-center text-gray-600 mt-10">Loading...</p>;
//   }

//   if (error) {
//     console.error("API Error:", error);
//     return <p className="text-center text-red-600 mt-10">Failed to load data</p>;
//   }

//   if (!data || !data.workouts || data.workouts.length === 0) {
//     return <p className="text-center text-gray-600 mt-10">No workouts available</p>;
//   }

//   const workoutDay = data.workouts[0];

//   const sections = [
//     {
//       title: "Warm-Up",
//       duration: `${workoutDay.warmUp.duration} min`,
//       exercises: workoutDay.warmUp.exercises || [],
//     },
//     {
//       title: "Main Workout",
//       duration: `${workoutDay.mainWorkout.duration} min`,
//       exercises: workoutDay.mainWorkout.exercises || [],
//     },
//     {
//       title: "Cool Down",
//       duration: `${workoutDay.coolDown.duration} min`,
//       exercises: workoutDay.coolDown.exercises || [],
//     },
//   ];

//   return (
//     <div className="bg-[#FAFAFA]">
//       <div className="container mx-auto lg:p-6 p-2 rounded-lg">
//         <div className="flex justify-between items-center mb-8 mt-12">
//           <h1 className="text-[32px] font-bold">Day: {workoutDay.day}</h1>
//           <p className="text-[#333333] text-[18px] font-medium">Workout Plan</p>
//         </div>

//         {sections.map((section, index) => (
//           <div key={index} className="mb-8 border rounded-2xl p-6 bg-white">
//             <div className="flex justify-between items-center border-b pb-2 mb-4">
//               <h2 className="text-xl font-semibold">{section.title}</h2>
//               <span className="text-gray-500">{section.duration}</span>
//             </div>
//             <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
//               {section.exercises.map((exercise:any, idx:number) => (
//                 <div key={idx} className="rounded-lg overflow-hidden shadow-sm">
//                   <div className="py-4 space-y-2 flex items-center justify-between">
//                     <div>
//                       <h3 className="lg:text-[24px] font-bold">{exercise.exerciseName}</h3>
//                       <p className="text-sm font-normal text-gray-600">Duration Time: {section.duration}</p>
//                     </div>
//                     <div className="p-2 rounded-full border-2">
//                       <MessageSquareShare />
//                     </div>
//                   </div>
//                   <Image height={464} width={766} src={exercise.gifImage} alt={exercise.exerciseName} className="w-full rounded-lg bg-cover lg:h-[464px]" />
//                   <p className="lg:text-[18px] font-normal text-[#545454] pt-5">{exercise.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkoutDayPage;

import React from 'react'

export default function WorkoutDayPage() {
  return (
    <div>WorkoutDayPage</div>
  )
}


