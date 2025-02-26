"use client"
import React from "react";
import { Skeleton } from "antd";

const LoadingSkeleton = () => {
  const fakeData = Array.from({ length: 5 });

  return (
    <div>
      <div className="container mx-auto lg:p-6 p-2 mb-16">
        <div className="lg:text-[48px] text-3xl font-semibold text-center my-10 text-[#000000]">
          <Skeleton.Input active style={{ width: 250 }} />
        </div>

        <div className="lg:text-[32px] text-2xl font-semibold mb-4">
          <Skeleton.Input active style={{ width: 200 }} />
        </div>

        <div className="bg-white shadow-lg rounded-lg lg:p-6 mt-4">
          <div className="text-lg font-semibold mb-4">
            <Skeleton.Input active style={{ width: 300 }} />
          </div>
    
          <div className="mt-4 max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-[#e6ebf1] z-10">
                <tr>
                  {["Day", "Warm-up", "Main Workout", "Cool Down"].map(
                    (header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-6 text-left"
                      >
                        <Skeleton.Input active style={{ width: "80px" }} />
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {fakeData.map((_, index) => (
                  <tr
                    key={index}
                    className="border border-r border-gray-300"
                  >
                    <td className="px-4 py-3 border border-r border-gray-300">
                      <Skeleton.Input active style={{ width: "100%" }} />
                    </td>
                    <td className="px-4 py-3 border border-r border-gray-300">
                      <Skeleton.Input active style={{ width: "100%" }} />
                    </td>
                    <td className="px-4 py-3 border border-r border-gray-300">
                      <Skeleton.Input active style={{ width: "100%" }} />
                    </td>
                    <td className="px-4 py-3 border border-r border-gray-300">
                      <Skeleton.Input active style={{ width: "100%" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-16">
          <Skeleton.Button active size="large" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
