/* eslint-disable @next/next/no-img-element */
"use client";
import Appointment from "@/components/Appointment";
import CardSkeleton from "@/components/cardSkeleton";
import DayBanner from "@/pages/dayRole/DayBanner";
import { useReviewMutation } from "@/redux/features/reviewSlice";
import { useUserWorkPlanDetailsQuery } from "@/redux/features/userworkplanSlice";
import { MessageSquareShare } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Exercise {
  _id: string;
  exerciseName: string;
  gifImage?: string; // Optional in case some exercises don't have images
  description: string;
  gymEquipmentNeeded: string;
}
// interface Review {
//     comment: string;
//     exerciseId: string;
// }
const WorkoutDayPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [reviewModal, setReviewModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [comment, setComment] = useState("");
//   const [rating, setRating] = useState(5);

  const workoutPlanId = params?.id as string;
  const currentDay = Number(searchParams?.get("day")) || 1; // Default to Day 1 if missing
  console.log("Workout Plan ID:", workoutPlanId, "Day:", currentDay);

  const { data, error, isLoading } = useUserWorkPlanDetailsQuery(
    { _id: workoutPlanId, day: currentDay },
    { skip: !workoutPlanId }
  );

  const [submitReview] = useReviewMutation()
  

  // Base URL for images
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || "";

  if (!workoutPlanId) {
    return (
      <p className="text-center text-red-600 mt-10">Invalid workout plan</p>
    );
  }

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (error) {
    console.error("API Error:", error);
    return (
      <p className="text-center text-red-600 mt-10">Failed to load data</p>
    );
  }

  const workoutDay = data?.data?.data;
  const totalDays = data?.data?.totalDay || 1;

  if (!workoutDay) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No workout details available
      </p>
    );
  }

  // Extract exercises from warm-up, main workout, and cool-down
  const warmUpExercises = workoutDay?.warmUp?.exercises || [];
  console.log(warmUpExercises)
  const mainWorkoutExercises = workoutDay?.mainWorkout?.exercises || [];
  const coolDownExercises = workoutDay?.coolDown?.exercises || [];

  // ✅ Navigation Functions
  const handlePreviousDay = () => {
    if (currentDay > 1) {
      router.push(`/myworkoutplan/${workoutPlanId}?day=${currentDay - 1}`);
    }
  };

  // const handleNextDay = () => {
  //   if (currentDay < totalDays) {
  //     router.push(`/myworkoutplan/${workoutPlanId}?day=${currentDay + 1}`);
  //   }
  // };

  const handleNextDay = () => {
    if (currentDay < totalDays) {
      router.push(`/myworkoutplan/${workoutPlanId}?day=${currentDay + 1}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Small delay ensures smooth navigation before reload
    }
  };
  


    // Open modal when clicking MessageSquareShare
    const handleOpenModal = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setReviewModal(true);
      };
    
    //   const handleSubmitReview = async () => {
    //     if (selectedExercise) {
    //     //   await submitReview({ comment, exerciseId: selectedExercise._id, rating }).unwrap();
    //     await submitReview({ comment, exerciseId: selectedExercise._id }).unwrap();
    //     console.log(submitReview)

    //       setReviewModal(false);
    //       setComment("");
    //     //   setRating(5);
    //     }
    //   };

    const handleSubmitReview = async () => {
      if (selectedExercise) {
        try {
          // Call the submitReview API
          const response = await submitReview({ comment, exerciseId: selectedExercise._id }).unwrap();
    
          // Check the response and display a success toast
          if (response.success) {
            toast.success("Review created successfully!");
          } else {
            toast.error("Failed to create review.");
          }
    
          // Reset the modal and form fields
          setReviewModal(false);
          setComment("");
          // setRating(5); // Reset rating if needed
        } catch (error) {
          // Handle error case
          console.log(error)
          toast.error("An error occurred while submitting the review.");
        }
      }
    };

  return (
    <div className="bg-[#FAFAFA]">
      <DayBanner></DayBanner>

      <div className="container mx-auto lg:p-6 p-2 rounded-lg">
        <div className="flex justify-between items-center mb-8 mt-12">
          <h1 className="text-[32px] font-bold">Day: {currentDay}</h1>
          <p className="text-[#333333] text-[18px] font-medium">
            {currentDay} / {totalDays} Day
          </p>
        </div>

        {/* Section Renderer */}
        {[
          {
            title: "Warm-Up",
            duration: workoutDay?.warmUp?.duration,
            exercises: warmUpExercises,
          },
          {
            title: "Main Workout",
            duration: workoutDay?.mainWorkout?.duration,
            exercises: mainWorkoutExercises,
          },
          {
            title: "Cool Down",
            duration: workoutDay?.coolDown?.duration,
            exercises: coolDownExercises,
          },
        ].map(
          (section, index) =>
            section.exercises.length > 0 && (
              <div key={index} className="mb-8 border rounded-2xl p-6 bg-white">
                <div className="flex justify-between items-center  pb-2 mb-4">
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <span className="text-gray-500">
                    Duration: {section.duration} min
                  </span>
                </div>
                <hr className="border border-[#8C8C8C]" />

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 ">
                  {section.exercises.map((exercise: Exercise) => (
                    <div
                      key={exercise._id}
                      className="rounded-lg overflow-hidden shadow-sm bg-white p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="lg:text-[24px] font-bold">
                            {exercise.exerciseName}
                          </h3>
                          <p className="text-sm font-normal text-gray-600">
                            Duration: {section.duration} min
                          </p>
                        </div>
                        <div className="p-2 rounded-full border-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOpenModal(exercise)}>
                          <MessageSquareShare />
                        </div>
                      </div>

                      {/* Image Container with Dynamic Base URL */}
                      <div className="relative w-full h-[250px] lg:h-[400px] rounded-lg overflow-hidden bg-gray-100">
                        {exercise.gifImage ? (
                          <img
                            src={`${IMAGE_BASE_URL}${exercise.gifImage}`}
                            alt={exercise.exerciseName}
                            className="rounded-lg w-full h-full object-cover"
                          />
                        ) : (
                          <p className="text-center text-gray-500">
                            No image available
                          </p>
                        )}
                      </div>

                      <p className="lg:text-[18px] font-normal text-[#545454] pt-5">
                        {exercise.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-end gap-10 mt-10">
          <button
            onClick={handlePreviousDay}
            disabled={currentDay === 1}
            className={`px-6 py-3 text-black font-bold rounded-lg transition ${
              currentDay === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "border-2 border-black"
            }`}
          >
            Previous Day
          </button>

          <button
            onClick={handleNextDay}
            disabled={currentDay === totalDays}
            className={`px-8 py-3 text-white text-[18px] font-normal rounded-lg transition ${
              currentDay === totalDays
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#01336F]"
            }`}
          >
            Next Day
          </button>
        </div>

        {/* Feedback Modal */}
        {reviewModal && selectedExercise && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Final Feedback</h2>

              {/* Star Rating */}
              {/* <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div> */}

              {/* Comment Box */}
              <textarea
                className="w-full border rounded-lg p-2 text-gray-700"
                rows={4}
                placeholder="Write your messages here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setReviewModal(false)}
                  className="text-gray-600"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="bg-[#01336F] text-white px-6 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Appointment></Appointment>
    </div>
  );
};

export default WorkoutDayPage;

