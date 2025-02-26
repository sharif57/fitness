'use client';

import React from 'react';
import { useMealPlanListQuery } from '@/redux/features/MealPlanSlice';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
  FaClipboardList,
  FaCalendarAlt,
  FaTrashAlt,
  FaInfoCircle
} from 'react-icons/fa';
import Link from 'next/link';
import CardSkeleton from '@/components/cardSkeleton';

interface MealPlan {
  _id: string;
  userId: string;
  planName: string;
  createdAt: string;
  plans: {
    day: number;
    calories: number;
    carb: number;
    protein: number;
    fiber: number;
    fat: number;
    isCompleted: boolean;
  }[];
}

const MealPlanSummary = () => {
  const { data, isLoading, isError } = useMealPlanListQuery(undefined);

  if (isLoading) {
    return <p className="text-center text-lg font-semibold"><CardSkeleton></CardSkeleton></p>;
  }

  if (isError || !data?.data) {
    return <p className="text-center text-lg text-red-500">Failed to load meal plans.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 h-screen">
      <h2 className="text-3xl font-bold text-center text-[#01336F] mb-6">Meal Plan Summary</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((mealPlan: MealPlan) => {
          const totalCalories = mealPlan.plans.reduce((acc, day) => acc + day.calories, 0);
          const totalCarbs = mealPlan.plans.reduce((acc, day) => acc + day.carb, 0);
          const totalProtein = mealPlan.plans.reduce((acc, day) => acc + day.protein, 0);
          const totalFiber = mealPlan.plans.reduce((acc, day) => acc + day.fiber, 0);
          const totalFat = mealPlan.plans.reduce((acc, day) => acc + day.fat, 0);
          const allCompleted = mealPlan.plans.every(day => day.isCompleted);

          return (
            <Link href={`/mymealplan/${mealPlan._id}`} 
              key={mealPlan._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200"
            >
              {/* Meal Plan Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#01336F]">{mealPlan.planName}</h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    allCompleted ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {allCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <FaCalendarAlt className="mr-2" />
                <span>{new Date(mealPlan.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Summary Statistics */}
              <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <p className="flex items-center">
                  <FaClipboardList className="text-[#F59E0B] mr-2" /> Total Days: <span className="font-semibold ml-2">{mealPlan.plans.length}</span>
                </p>
                <p className="flex items-center">
                  <FaChartPie className="text-[#3B82F6] mr-2" /> Total Calories: <span className="font-semibold ml-2">{totalCalories} kcal</span>
                </p>
                <p>🍞 Carbs: <span className="font-semibold">{totalCarbs}g</span></p>
                <p>💪 Protein: <span className="font-semibold">{totalProtein}g</span></p>
                <p>🌿 Fiber: <span className="font-semibold">{totalFiber}g</span></p>
                <p>🥑 Fat: <span className="font-semibold">{totalFat}g</span></p>
              </div>

             
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MealPlanSummary;
