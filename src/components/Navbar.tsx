// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useState, useEffect } from "react";
// import { Bell, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import { useUserProfileQuery } from "@/redux/features/userSlice";
// import { Dropdown, MenuProps } from "antd";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { useMyWorkPlanAddQuery } from "@/redux/features/userworkplanSlice";

// // interface UserProfile {
// //   name: string;
// //   email: string;
// //   phone: string;
// //   role: string;
// //   image?: string;
// // }

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: userData } = useUserProfileQuery<any>();
//   const userProfile = userData?.data;
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY; // Ensure .env.local has this variable
//   const { data } = useMyWorkPlanAddQuery(undefined);
//   const workPlans = data?.data || [];

//   const handleLogOut = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       Cookies.remove("accessToken", { path: "/" });
//       toast.success("Logout successful!");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1000);
//     }
//   };

//   const items = [
//     { key: "1", label: "My Account", disabled: true },
//     { type: "divider" },
//     { key: "2", label: <Link href="/profile">Profile</Link> },
//     { key: "3", label: <Link href="/myappointment">My Appointment</Link> },
//     { key: "4", label: <Link href="/myworkoutplan">My Workout Plan</Link> },
//     { key: "4", label: <Link href="/mymealplan">My Meal Plan</Link> },
//     { type: "divider" },
//     {
//       key: "5",
//       label: (
//         <button className="text-[#BF0C0A]  font-normal " onClick={handleLogOut}>
//           Logout
//         </button>
//       ),
//     },
//   ];

//   const menuItems = [
//     { title: "Home", path: "/" },
//     { title: "Workout Plan", path: "/workoutplan1" },
//     { title: "Nutrition Plan", path: "/nutritionplan1" },
//     { title: "About Us", path: "/about1" },
//     { title: "Subscription", path: "/subscription1" },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ✅ Ensure profile image URL is correct
//   const profileImage = userProfile?.image?.startsWith("http")
//     ? userProfile.image
//     : `${API_BASE_URL}${userProfile?.image || "/images/user.png"}`;

//   return (
//     <nav className="bg-[#ffffff] shadow-md sticky top-0 z-50">
//       <div className="mx-auto max-w-[1580px] px-6 lg:px-12 py-6 flex justify-between items-center">
//         <button
//           onClick={() => setOpen(true)}
//           className="lg:hidden text-black border-2 p-2 rounded-lg"
//         >
//           <Menu className="w-6 h-6" />
//         </button>
//         <Link href="/">
//           <Image height={45} width={200} src="/images/logo.png" alt="Logo" />
//         </Link>
//         <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium ml-auto">
//           {menuItems.map((item, index) => (
//             <li key={index} className="relative group">
//               <Link
//                 href={item.path}
//                 className={`flex items-center transition ${
//                   pathname === item.path
//                     ? "text-[#01336F] font-bold"
//                     : "text-[#5F5F5F] hover:text-black"
//                 }`}
//               >
//                 {item.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="hidden lg:flex items-center gap-6 ml-10">
//           {/* Notification Bell */}

//           {userProfile ? (
//             <div className="flex items-center gap-4 ">
//               <Link href={"/myworkoutplan"}>
//                 <div className="border border-gray-300 rounded-full ">
//                   <div className="relative size-12 flex items-center justify-center rounded-full  ">
//                     <Bell size={28} className="text-black " />
//                     {/* Notification Badge */}
//                     <span className="absolute top-1 right-1 bg-[#012A60] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                       {workPlans.length}
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//               <Dropdown
//                 menu={{ items } as MenuProps}
//                 placement="bottomRight"
//                 arrow
//               >
//                 <div className="flex items-center gap-3 cursor-pointer">
//                   <img
//                     src={profileImage || "/images/user.png"}
//                     alt="User Avatar"
//                     className="size-12 rounded-full border object-cover"
//                     onError={(e) => (e.currentTarget.src = "/images/user.png")}
//                   />
//                 </div>
//               </Dropdown>
//             </div>
//           ) : (
//             <Link href="/login">
//               <button className="bg-[#01336F] text-white px-8 py-4 rounded-lg text-[18px]">
//                 Sign Up
//               </button>
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-80 bg-[#daedf2] z-50 shadow-lg transform transition-transform ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between bg-white items-center px-4 py-3 border-b">
//           <img src="/images/logo.png" alt="Logo" className="h-[30px]" />
//           <button
//             onClick={() => setOpen(false)}
//             className="text-black border-2 p-2 rounded-lg"
//           >
//             <X />
//           </button>
//         </div>
//         <div className="flex flex-col h-full p-4">
//           {menuItems.map((item, index) => (
//             <Link
//               key={index}
//               href={item.path}
//               className={`block py-2 ${
//                 pathname === item.path
//                   ? "text-blue-600 font-bold"
//                   : "text-gray-700 hover:text-black"
//               }`}
//               onClick={() => setOpen(false)}
//             >
//               {item.title}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}
//     </nav>
//   );
// }

/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useContext } from "react";
import { Bell, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import { Dropdown, MenuProps } from "antd";
import { toast } from "react-toastify";
import { useMyWorkPlanAddQuery } from "@/redux/features/userworkplanSlice";
import { logout } from "@/service/authService";
import {
  NotificationContext,
  NotificationContextProps,
} from "@/Providers/NotifyNotificationChange";

export default function Navbar() {
  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContextProps;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: userData } = useUserProfileQuery<any>();
  const userProfile = userData?.data;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY; // Ensure .env.local has this variable
  const { data, refetch } = useMyWorkPlanAddQuery(undefined);
  const workPlans = data?.data || [];

  const handleLogOut = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      await logout();
      // Cookies.remove("accessToken", { path: "/" });
      toast.success("Logout successful!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const items = [
    { key: "1", label: "My Account", disabled: true },
    { type: "divider" },
    { key: "2", label: <Link href="/profile">Profile</Link> },
    { key: "3", label: <Link href="/myappointment">My Appointment</Link> },
    { key: "4", label: <Link href="/myworkoutplan">My Workout Plan</Link> },
    { key: "4", label: <Link href="/mymealplan">My Meal Plan</Link> },
    { type: "divider" },
    {
      key: "5",
      label: (
        <button className="text-[#BF0C0A]  font-normal " onClick={handleLogOut}>
          Logout
        </button>
      ),
    },
  ];

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Workout Plan", path: "/workoutplan1" },
    { title: "Nutrition Plan", path: "/nutritionplan1" },
    { title: "About Us", path: "/about1" },
    { title: "Subscription", path: "/subscription1" },
  ];

  useEffect(() => {
    refetch();
  }, [showNotification]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Ensure profile image URL is correct
  const profileImage = userProfile?.image?.startsWith("http")
    ? userProfile.image
    : `${API_BASE_URL}${userProfile?.image || "/images/user.png"}`;

  return (
    <nav className="bg-[#ffffff] shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1580px] px-6 lg:px-12 py-6 flex justify-between items-center">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-black border-2 p-2 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/">
          <Image height={45} width={200} src="/images/logo.png" alt="Logo" />
        </Link>
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium ml-auto">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.path}
                className={`flex items-center transition ${
                  pathname === item.path
                    ? "text-[#01336F] font-bold"
                    : "text-[#5F5F5F] hover:text-black"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-6 ml-10">
          {/* Notification Bell */}
          {userProfile ? (
            <div className="flex items-center gap-4 ">
              <Link href={"/myworkoutplan"}>
                <div className="border border-gray-300 rounded-full ">
                  <div className="relative size-12 flex items-center justify-center rounded-full  ">
                    <Bell size={28} className="text-black " />
                    {/* Notification Badge */}
                    <span className="absolute top-1 right-1 bg-[#012A60] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {workPlans.length}
                    </span>
                  </div>
                </div>
              </Link>
              <Dropdown
                menu={{ items } as MenuProps}
                placement="bottomRight"
                arrow
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={profileImage || "/images/user.png"}
                    alt="User Avatar"
                    className="size-12 rounded-full border object-cover"
                    onError={(e) => (e.currentTarget.src = "/images/user.png")}
                  />
                </div>
              </Dropdown>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-[#01336F] text-white px-8 py-4 rounded-lg text-[18px]">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#daedf2] z-50 shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between bg-white items-center px-4 py-3 border-b">
          <img src="/images/logo.png" alt="Logo" className="h-[30px]" />
          <button
            onClick={() => setOpen(false)}
            className="text-black border-2 p-2 rounded-lg"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col h-full p-4">
          {userProfile ? (
            menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`block py-2 ${
                  pathname === item.path
                    ? "text-blue-600 font-bold"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))
          ) : (
            <div>
              <Link
                href="/login"
                className="block py-2 text-gray-700 hover:text-black"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
}
