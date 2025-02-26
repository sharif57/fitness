"use client";

import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MealPlanCreate() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: userData } = useUserProfileQuery();
  const user = userData?.data;

  const { data: subscriptionData } = useSubscriptionGetQuery(undefined);
  const userSubscription = subscriptionData?.data;

  // Subscription validation
  const packageName = userSubscription?.package?.name?.toLowerCase();
  const subscriptionStatus = userSubscription?.status === "active";

  const hasWorkoutSubscription =
    packageName === "nutrition" && subscriptionStatus;

  const hasBothSubscription =
    packageName === "workout & nutrition" && subscriptionStatus;

//   const extractDaysFromInput = (input: any) => {
//     const match = input.match(/(\d+)\s*days?/i);
//     const days = match ? parseInt(match[1]) : 7; // Default to 7 days
//     return days > 7 ? 7 : days; // Ensure max days is 7
//   };

const extractDaysFromInput = (input: any) => {
    const match = input.match(/(\d+)\s*days?/i);
    return match ? parseInt(match[1]) : null; 
};

  useEffect(() => {});

  const handleSendMessage = async () => {
    if (!user || (!hasWorkoutSubscription && !hasBothSubscription)) {
      toast.error("You need a valid subscription to use this feature.");
      return;
    }

    setLoading(true);

    const workoutPlanMessage = createWorkoutPlanMessage();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful AI fitness assistant.",
              },
              { role: "user", content: workoutPlanMessage },
            ],
          }),
        }
      );

      const { data: gptResponseText } = await response.json();

      const planData = extractJsonData(gptResponseText);

    

      console.log("planData", planData);
      localStorage.setItem("mealPlan", gptResponseText);
      

      
      router.push('/nutritionplan1/mealPlancreate');


      if (!planData) {
        throw new Error("Failed to parse GPT response into valid JSON.");
      }

      // Proceed with planData (e.g., save to database, update state)
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        "Failed to generate your plan please try again.",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const extractJsonData = (jsonString: any) => {
    try {
      const match = jsonString.match(/{[\s\S]*}/);
      if (match) {
        return JSON.parse(match[0]);
      } else {
        throw new Error("No valid JSON found in GPT response.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const createWorkoutPlanMessage = () => {
    if (!inputMessage || !user) return "User details are missing.";
    const days = extractDaysFromInput(inputMessage);

    return `
      - Name: ${user.name}
      - Email: ${user.email}
      - Phone: ${user.phone}
      - Role: ${user.role}
      - Goal: ${inputMessage}

      Create a meal plan based on the user details and suggestions for ${days} days.

      Respond only with JSON data in the following format:

      {
        "planName": "User-Specified Plan Name",
        "userId": "${user._id}",
        "plans": [
          {
            "day": 1,
            "breakfast": "Description of breakfast meal.",
            "midMorningSnack": "Description of mid-morning snack.",
            "lunch": "Description of lunch meal.",
            "afternoonSnack": "Description of afternoon snack.",
            "dinner": "Description of dinner meal.",
            "calories": 0,
            "carb": 0,
            "protein": 0,
            "fiber": 0,
            "fat": 0,
            "isCompleted": false
          },
          // Repeat for each day up to ${days}
        ]
      }
    `;
  };

  return (
    <div>
      <div className="flex items-center  w-5/6 mx-auto bg-white/10 backdrop-blur-lg rounded-lg px- ">
        <span className="text-white/70 text-lg pl-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"
              fill="white"
            />
          </svg>
        </span>

        <input
          type="text"
          value={inputMessage}
          disabled={!hasWorkoutSubscription && !hasBothSubscription}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!hasWorkoutSubscription && !hasBothSubscription) {
                toast.warn(
                  "You need an active subscription to access this feature."
                );
                router.push("/subscription1");
              } else {
                handleSendMessage();
              }
            }
          }}
          placeholder={
            hasWorkoutSubscription || hasBothSubscription
              ? "Enter maximum 7 days workout plan"
              : "Subscription required"
          }
          className="bg-transparent w-full  text-white placeholder-white/50 outline-none px-2 py-6"
        />

        <button
          onClick={handleSendMessage}
          className={`bg-[#01336F] text-white lg:px-10 px-4 lg:py-6 py-6 rounded-r-lg flex items-center justify-center ${
            !hasWorkoutSubscription && !hasBothSubscription
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            (!hasWorkoutSubscription && !hasBothSubscription) || loading
          }
        >
          {loading ? (
            <div className="loader-inner">
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
            </div>
          ) : (
            <h1 className="text-[18px] font-normal text-[#FFFFFF]">Enter</h1>
          )}
        </button>
      </div>
    </div>
  );
}
