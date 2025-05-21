// "use client";

// import { useState, useEffect, useContext } from "react";
// import { Bell, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import { useUserProfileQuery } from "@/redux/features/userSlice";
// import { Dropdown, MenuProps } from "antd";
// import { toast } from "react-toastify";
// import { useMyWorkPlanAddQuery } from "@/redux/features/userworkplanSlice";
// import { logout } from "@/service/authService";
// import {
//   NotificationContext,
//   NotificationContextProps,
// } from "@/Providers/NotifyNotificationChange";
// import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";

// export default function Navbar() {
//   const { showNotification } = useContext(
//     NotificationContext
//   ) as NotificationContextProps;

//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: userData } = useUserProfileQuery<any>();
//   const userProfile = userData?.data;
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
//   const { data, refetch } = useMyWorkPlanAddQuery(undefined);
//   const workPlans = data?.data || [];
//   useEffect(() => {
//     refetch();
//   }, [showNotification]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

//   const hiddenPaths = ["/chat"];

//   if (pathname && hiddenPaths.includes(pathname)) {
//     return null;
//   }

//   const handleLogOut = async () => {
//     if (toast.info("Logging out...")) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       await logout();
//       // toast.success("Logout successful!");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1000);
//     }
//   };

//    const { data: subscriptionData } = useSubscriptionGetQuery(undefined);
//     const userSubscription = subscriptionData?.data;
  
//     // ✅ Subscription validation
//     const packageName = userSubscription?.package?.name?.toLowerCase();
//     const subscriptionStatus = userSubscription?.status === "active"; // Only active subscriptions allowed
  
//     const hasWorkoutSubscription =
//       packageName === "workout" && subscriptionStatus;
  
//     const hasBothSubscription =
//       packageName === "workout & nutrition" && subscriptionStatus;

//   const items: MenuProps["items"] = [
//     { key: "1", label: "My Account", disabled: true },
//     { type: "divider" },
//     { key: "2", label: <Link href="/profile">Profile</Link> },
//     { key: "3", label: <Link href="/myappointment">My Appointment</Link> },
//     { key: "4", label: <Link href=" /chat">My Workout History</Link> },
//     { key: "5", label: <Link href="/mymealplan">My Meal Plan</Link> },
//     { type: "divider" },
//     {
//       key: "6",
//       label: (
//         <button className="text-[#BF0C0A] font-normal" onClick={handleLogOut}>
//           Logout
//         </button>
//       ),
//     },
//   ];

//   const menuItems = [
//     { title: "Home", path: "/" },
//     { title: "Workout Plan ", path: "/chat" },
//     { title: "Nutrition Plan", path: "/nutritionplan1" },
//     { title: "About Us", path: "/about1" },
//     { title: "Subscription", path: "/subscription1" },
//   ];

//   const profileImage = userProfile?.image?.startsWith("http")
//     ? userProfile.image
//     : `${API_BASE_URL}${userProfile?.image || "/images/user.png"}`;

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="mx-auto max-w-[1580px] px-6 lg:px-12 py-6 flex justify-between items-center">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setOpen(true)}
//           className="lg:hidden text-black border-2 p-2 rounded-lg"
//         >
//           <Menu className="w-6 h-6" />
//         </button>

//         {/* Logo */}
//         <Link href="/">
//           <Image height={45} width={200} src="/images/logo.png" alt="Logo" />
//         </Link>

//         {/* Desktop Navigation */}
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

//         {/* Desktop User Section */}
//         <div className="hidden lg:flex items-center gap-6 ml-10">
//           {userProfile ? (
//             <div className="flex items-center gap-4">
//               {/* Notifications */}
//               <Link href="/myworkoutplan">
//                 <div className="border border-gray-300 rounded-full relative size-12 flex items-center justify-center">
//                   <Bell size={28} className="text-black" />
//                   <span className="absolute top-1 right-1 bg-[#012A60] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                     {workPlans.length}
//                   </span>
//                 </div>
//               </Link>
//               {/* Profile Dropdown */}
//               <Dropdown menu={{ items }} placement="bottomRight" arrow>
//                 <div className="flex items-center gap-3 cursor-pointer">
//                   <img
//                     src={profileImage}
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
//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-80 bg-[#daedf2] z-50 shadow-lg transform transition-transform ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex relative justify-between bg-white items-center px-4 py-3 border-b">
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
//               className={`block py-2 transition ${
//                 pathname === item.path
//                   ? "text-blue-600 font-bold"
//                   : "text-gray-700 hover:text-black"
//               }`}
//               onClick={() => setOpen(false)}
//             >
//               {item.title}
//             </Link>
//           ))}

//           {/* Mobile Profile Dropdown (Only if user is logged in) */}
//           {userProfile && (
//             <Dropdown menu={{ items }} placement="bottomRight" arrow>
//               <div className="flex items-center gap-3 cursor-pointer mt-4">
//                 <img
//                   src={profileImage}
//                   alt="User Avatar"
//                   className="size-12 rounded-full border object-cover"
//                   onError={(e) => (e.currentTarget.src = "/images/user.png")}
//                 />
//               </div>
//             </Dropdown>
//           )}

//           {/* Mobile-Only Sign Up Button (Only if user is not logged in) */}
//           {!userProfile && (
//             <div className="absolute bottom-0 w-full p-4  right-2 block lg:hidden">
//               <Link href="/login">
//                 <button className="w-full bg-[#01336F] text-white py-3 rounded-lg text-[18px]">
//                   Sign Up
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

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
import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";

export default function Navbar() {
  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContextProps;

  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: userData } = useUserProfileQuery<any>();
  const userProfile = userData?.data;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
  const { data, refetch } = useMyWorkPlanAddQuery(undefined);
  const workPlans = data?.data || [];

  // Subscription data
  const { data: subscriptionData } = useSubscriptionGetQuery(undefined);
  const userSubscription = subscriptionData?.data;

  // Subscription validation
  const packageName = userSubscription?.package?.name?.toLowerCase();
  const subscriptionStatus = userSubscription?.status === "active";
  const hasWorkoutSubscription =
    packageName === "workout" && subscriptionStatus;
  const hasBothSubscription =
    packageName === "workout & nutrition" && subscriptionStatus;

  // Check if user has access to /chat
  const hasChatAccess = hasWorkoutSubscription || hasBothSubscription;

  useEffect(() => {
    refetch();
  }, [showNotification]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const hiddenPaths = ["/chat"];

  if (pathname && hiddenPaths.includes(pathname)) {
    return null;
  }

  const handleLogOut = async () => {
    if (toast.info("Logging out...")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      await logout();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const handleChatClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === "/chat" && !hasChatAccess) {
      e.preventDefault();
      toast.error("Please subscribe to a Workout plan to access this feature.");
      router.push("/subscription1");
    }
  };

  const items: MenuProps["items"] = [
    { key: "1", label: "My Account", disabled: true },
    { type: "divider" },
    { key: "2", label: <Link href="/profile">Profile</Link> },
    { key: "3", label: <Link href="/myappointment">My Appointment</Link> },
    {
      key: "4",
      label: (
        <Link
          href="/chat"
          onClick={(e) => handleChatClick(e, "/chat")}
        >
          My Workout History
        </Link>
      ),
    },
    { key: "5", label: <Link href="/mymealplan">My Meal Plan</Link> },
    { type: "divider" },
    {
      key: "6",
      label: (
        <button className="text-[#BF0C0A] font-normal" onClick={handleLogOut}>
          Logout
        </button>
      ),
    },
  ];

  // Always include "Workout Plan" in the menu
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Workout Plan", path: "/chat" }, // Always show Workout Plan
    { title: "Nutrition Plan", path: "/nutritionplan1" },
    { title: "About Us", path: "/about1" },
    { title: "Subscription", path: "/subscription1" },
  ];

  const profileImage = userProfile?.image?.startsWith("http")
    ? userProfile.image
    : `${API_BASE_URL}${userProfile?.image || "/images/user.png"}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1580px] px-6 lg:px-12 py-6 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-black border-2 p-2 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/">
          <Image height={45} width={200} src="/images/logo.png" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium ml-auto">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.path}
                onClick={(e) => handleChatClick(e, item.path)}
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

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center gap-6 ml-10">
          {userProfile ? (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Link href="/myworkoutplan">
                <div className="border border-gray-300 rounded-full relative size-12 flex items-center justify-center">
                  <Bell size={28} className="text-black" />
                  <span className="absolute top-1 right-1 bg-[#012A60] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {workPlans.length}
                  </span>
                </div>
              </Link>
              {/* Profile Dropdown */}
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={profileImage}
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
        <div className="flex relative justify-between bg-white items-center px-4 py-3 border-b">
          <img src="/images/logo.png" alt="Logo" className="h-[30px]" />
          <button
            onClick={() => setOpen(false)}
            className="text-black border-2 p-2 rounded-lg"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col h-full p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={(e) => {
                handleChatClick(e, item.path);
                setOpen(false);
              }}
              className={`block py-2 transition ${
                pathname === item.path
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {item.title}
            </Link>
          ))}

          {/* Mobile Profile Dropdown (Only if user is logged in) */}
          {userProfile && (
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <div className="flex items-center gap-3 cursor-pointer mt-4">
                <img
                  src={profileImage}
                  alt="User Avatar"
                  className="size-12 rounded-full border object-cover"
                  onError={(e) => (e.currentTarget.src = "/images/user.png")}
                />
              </div>
            </Dropdown>
          )}

          {/* Mobile-Only Sign Up Button (Only if user is not logged in) */}
          {!userProfile && (
            <div className="absolute bottom-0 w-full p-4 right-2 block lg:hidden">
              <Link href="/login">
                <button className="w-full bg-[#01336F] text-white py-3 rounded-lg text-[18px]">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}