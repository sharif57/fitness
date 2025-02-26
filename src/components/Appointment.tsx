/* eslint-disable @next/next/no-img-element */
// 'use client'
// import { useAppointmentAllQuery } from "@/redux/features/appointmentSlice";
// import { CircleCheck } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// type consultations = {
//   consultations: {
//     id: number;
//     title: string;
//     price: number;
//     description: string[];
//     image: string;
//   }[];
// };
// interface Consultations {
//   _id: string;
//   title: string;
//   image: string;
//   description: string[];
//   price: number;
//   availableTimes: string[];
//   status: boolean;
//   __v: number;
// }

// const consultations = [
//   {
//     id: 1,
//     title: "Initial Consultation",
//     price: 500,
//     description: [
//       "Analyze your current eating habits.",
//       "Personal nutrition goals.",
//       "Providing healthy meal plans.",
//       "Advice related to lifestyle and nutrition.",
//     ],
//     image: "/images/book.png",
//   },
//   {
//     id: 2,
//     title: "Talk To Fitness",
//     price: 100,
//     description: ["Consultation to create a program for desired goals."],
//     image: "/images/book1.png",
//   },
// ];

// const Appointment = () => {
//   const {data} = useAppointmentAllQuery(undefined)
//   console.log(data?.data,'payment')
//   return (
//     <div className=" py-10 max-w-7xl mx-auto">
//       <div className="text-center mb-8 lg:w-1/2 mx-auto p-3 lg:p-0 ">
//         <h1 className="lg:text-[48px] text-3xl font-semibold">Book an Appointment</h1>
//         <p className="text-gray-600 mt-8">
//         you have arranged to see them at a particular time, usually in connection with their work or for a serious purpose
//         </p>
//       </div>
//       <div className="flex flex-col md:flex-row justify-center items-start gap-14">
//         {consultations.map((consultation) => (
//           <div
//             key={consultation.id}
//             className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3"
//           >
//             <Image
//               height={400}
//               width={400}
//               src={consultation.image}
//               alt={consultation.title}
//               className="w-full  rounded-t-lg"
//             />
//             <div className="mt-4 ">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-[24px] font-medium ">
//                   {consultation.title}
//                 </h2>
//                 <p className="text-[#01336F] font-bold text-[32px]">
//                   ${consultation.price}
//                 </p>
//               </div>
//               <ul className="text-[#545454] space-y-5 mt-4 ">
//                 {consultation.description.map((item, index) => (
//                   <li className="flex items-center gap-2" key={index}>
//                  <CircleCheck size={24} color="#345C8C" strokeWidth={3} absoluteStrokeWidth />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <Link href={'/appointment'} className=" mt-8 flex justify-between gap-4">
//               <button className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg  transition">
//                 Book Now
//               </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Appointment;

"use client";
import { useAppointmentAllQuery } from "@/redux/features/appointmentSlice";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import React from "react";
import AppointmentCardSkeleton from "./common/Skeleton/AppointmentSkeleton";

interface Consultation {
  _id: string;
  title: string;
  image: string;
  description: string[] | string;
  price: number;
  availableTimes: string[];
  status: boolean;
}

const Appointment: React.FC = () => {
  const { data, isLoading, error } = useAppointmentAllQuery(undefined);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || ""; // Ensure this is correctly set in .env.local

  // if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load data</p>
    );

  return (
    <>
      {isLoading ? (
        <AppointmentCardSkeleton />
      ) : (
        <div className="py-10 max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:w-1/2 mx-auto p-3 lg:p-0">
            <h1 className="lg:text-[48px] text-3xl font-semibold">
              Book an Appointment
            </h1>
            <p className="text-gray-600 mt-8">
              You have arranged to see them at a particular time, usually in
              connection with their work or for a serious purpose.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-start gap-14">
            {data?.data.map((consultation: Consultation) => (
              <div
                key={consultation._id}
                className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3"
              >
                <img
                  src={
                    consultation.image.startsWith("http")
                      ? consultation.image
                      : `${API_BASE_URL}${consultation.image}`
                  }
                  alt={consultation.title}
                  className="w-full rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="lg:text-[24px] text-[20px] font-medium">
                      {consultation.title}
                    </h2>
                    <p className="text-[#01336F] font-bold lg:text-[32px] text-[20px]">
                      ${consultation.price}
                    </p>
                  </div>
                  <ul className="text-[#545454] space-y-5 mt-4">
                    {Array.isArray(consultation.description) ? (
                      consultation.description.map((item, index) => (
                        <li className="flex items-center gap-2" key={index}>
                          <CircleCheck
                            size={24}
                            color="#345C8C"
                            strokeWidth={3}
                            absoluteStrokeWidth
                          />
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="flex items-center gap-2">
                        <CircleCheck
                          size={24}
                          color="#345C8C"
                          strokeWidth={3}
                          absoluteStrokeWidth
                        />
                        {consultation.description}
                      </li>
                    )}
                  </ul>
                </div>
                <Link
                  href={`/appointment/${consultation._id}`}
                  className="mt-8 flex justify-between gap-4"
                >
                  <button className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition">
                    Book Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
