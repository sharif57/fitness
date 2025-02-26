"use client";
import React from "react";
import { Skeleton, Card } from "antd";

export default function AppointmentCardSkeleton() {
  const fakeData = Array.from({ length: 2 });

  return (
    <div className="py-10 max-w-7xl mx-auto">
      <div className="text-center mb-8 lg:w-1/2 mx-auto p-3 lg:p-0">
        <h1 className="lg:text-[48px] text-3xl font-semibold">
          <Skeleton.Input active style={{ width: 250 }} />
        </h1>
        <div className="text-gray-600 mt-8">
          <Skeleton.Input active style={{ width: 400 }} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-14">
        {fakeData.map((_, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3"
          >
            {/* Image Skeleton */}
            <Skeleton.Image className="w-full h-[200px] rounded-lg" />

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <Skeleton.Input active style={{ width: 150 }} />
                <Skeleton.Input active style={{ width: 80 }} />
              </div>

              <ul className="text-[#545454] space-y-5 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <Skeleton.Avatar active size="small" shape="circle" />
                    <Skeleton.Input active style={{ width: 200 }} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex justify-between gap-4">
              <Skeleton.Button active block style={{ height: 48 }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
