"use client";
import { useAllWorkoutDetailsQuery } from "@/redux/features/planWorkoutSlice";
import { ArrowLeft, Target, BookOpen } from "lucide-react";
import { marked } from "marked";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data, isLoading, error } = useAllWorkoutDetailsQuery(id);
  const workout = data?.data;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

  // Configure marked for better HTML output
  React.useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !workout) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
          {/* Image Section */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div className="relative  w-full">
                <img
                  src={`${API_BASE_URL}${workout.image}`}
                  alt={workout.name}
                  className="w-full lg:h-[600px] h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {workout.name}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 w-fit">
                  ID: {workout._id.slice(-6)}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                {workout.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Workout Guide
              </h3>
            </div>

            <div
              className="prose prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-blue-700
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-4 prose-li:my-1 prose-li:text-gray-700
                prose-hr:border-gray-300 prose-hr:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                sm:prose-lg"
              dangerouslySetInnerHTML={{
                __html: marked.parse(workout.description || ""),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md"></div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] w-full bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-6 w-full bg-gray-200 animate-pulse rounded-md"></div>
            </div>

            <div className="flex gap-3">
              <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="h-96 w-full bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Workout Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The workout you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
}
