

"use client";
import React from "react";
import { ShieldCheck } from "lucide-react";
import { useAllPackageGetQuery } from "@/redux/features/packageSlice";
import {
  useSubscriptionGetQuery,
  useSubscriptionMutation,
  useSubscriptionUpdateMutation,
} from "@/redux/features/subscriptionSlice";
import MembershipSkeleton from "./common/Skeleton/MembershipSkeleton";
import { toast } from "react-toastify";

// Define Type for Membership Plans from the API
interface PackageData {
  _id: string;
  name: string;
  unitAmount: number;
  description: string[];
}

// Define the shape of our membership plan for the UI
type MembershipPlanType = {
  id: string;
  title: string;
  price: string;
  features: string[];
};

const Membership: React.FC = () => {
  // Fetch all packages and the user's subscription info
  const { data, error, isLoading } = useAllPackageGetQuery(undefined);
  const { data: userSubscription } = useSubscriptionGetQuery(undefined);
  const [subscription] = useSubscriptionMutation();
  const [subscriptionUpdate] = useSubscriptionUpdateMutation();

  // Handler for new subscription purchase
  const handleSubscription = async (packageId: string) => {
    try {
      const response = await subscription({ packageId }).unwrap();
      if (response.url) {
        const newTab = window.open("", "_blank"); // Open a blank new tab first
        if (newTab) {
          newTab.location.href = response.url; // Redirect in the new tab
        } else {
          // Fallback if popup blocked
          window.location.href = response.url;
        }
      }
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  // Handler for updating an existing subscription
  const handleUpdateSubscription = async (newPackageId: string) => {
    try {
      const response = await subscriptionUpdate({ newPackageId }).unwrap();
      if (response.success) {
        toast.success("Subscription updated successfully!")
      
       setTimeout(() => {
         window.location.reload()}, 1000)
        
      } else {
        alert("Failed to update subscription.");
      }
    } catch (err) {
      console.error("Subscription update failed:", err);
      alert("Failed to update subscription.");
    }
  };

  if (error) return <div>Error loading plans.</div>;

  // Map API data to UI-friendly membership plans
  const plans: MembershipPlanType[] =
    data?.data?.map((plan: PackageData) => ({
      id: plan._id,
      title: plan.name,
      price: `$${plan.unitAmount}/month`,
      features: plan.description,
    })) || [];

  return (
    <>
      {isLoading ? (
        <MembershipSkeleton />
      ) : (
        <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="lg:text-[48px] text-[30px] font-semibold">
              Membership Plan
            </h2>
            <p className="text-gray-500 mt-2">
              Strong bodies start with smart choices. Empowering healthier,
              happier lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan: MembershipPlanType) => {
              // Determine if the current plan is the user's active subscription
              const isSubscribed =
                userSubscription?.data?.status === "active" &&
                userSubscription?.data?.package?._id === plan.id;

              return (
                <div
                  key={plan.id}
                  className="bg-white shadow-lg rounded-xl border p-6 flex flex-col justify-between hover:bg-[#EAF1FB] transition duration-300 ease-in-out"
                >
                  {/* Plan Title & Price */}
                  <div>
                    <h3 className="text-xl font-semibold text-center">
                      {plan.title}
                    </h3>
                    <p className="text-[#01336F] text-center text-lg font-medium mt-1">
                      {plan.price}
                    </p>
                    <hr className="my-4" />
                  </div>

                  {/* Features List */}
                  <ul className="space-y-6">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-gray-600"
                      >
                        <span className="text-[#01336F]">
                          <ShieldCheck />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Render a single action button based on subscription status */}
                  {/* Render buttons based on subscription status */}
                  {isSubscribed ? (
                    <button
                      disabled
                      className="w-full text-center bg-gray-400 text-white rounded-lg py-3 mt-6 transition cursor-not-allowed"
                    >
                      Already Subscribed
                    </button>
                  ) : (
                    <button
                      onClick={
                        () =>
                          userSubscription?.data?.status === "active"
                            ? handleUpdateSubscription(plan.id) // If already subscribed, update to a new package
                            : handleSubscription(plan.id) // If first time, purchase a new subscription
                      }
                      className="w-full text-center bg-[#01336F] hover:bg-[#012A5E] text-white rounded-lg py-3 mt-6 transition"
                    >
                      {userSubscription?.data?.status === "active"
                        ? "Update Subscription"
                        : "Purchase Now"}
                    </button>
                  )}

                  {/* Render buttons based on subscription status */}
                  {/* {isSubscribed ? (
                    <div className="flex flex-col gap-4">
                      <button
                        disabled
                        className="w-full text-center bg-gray-400 text-white rounded-lg py-3 transition cursor-not-allowed"
                      >
                        Already Subscribed
                      </button> 
                      <button
                        onClick={() => handleUpdateSubscription(plan.id)}
                        className="w-full text-center bg-[#01336F] hover:bg-[#012A5E] text-white rounded-lg py-3 transition"
                      >
                        Update Subscription
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSubscription(plan.id)}
                      className="w-full text-center bg-[#01336F] hover:bg-[#012A5E] text-white rounded-lg py-3 transition"
                    >
                      Purchase Now
                    </button>
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Membership;
