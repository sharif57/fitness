'use client'
import React from 'react';
import { Skeleton, Card } from 'antd';

export default function MembershipSkeleton() {
    const fakeData = Array.from({ length: 3 });

    return (
        <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
            {/* Header */}
            <div className="text-center mb-14">
                <div className="lg:text-[48px] text-[30px] font-semibold">
                    <Skeleton.Input active style={{ width: 300 }} />
                </div>
                <div className="text-gray-500 mt-2">
                    <Skeleton.Input active style={{ width: 400 }} />
                </div>
            </div>

            {/* Card Skeleton Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {fakeData.map((_, index) => (
                    <Card
                        key={index}
                        className="bg-white shadow-lg rounded-xl border p-6 flex flex-col justify-between hover:bg-[#EAF1FB] transition duration-300 ease-in-out"
                    >
                        {/* Plan Title & Price */}
                        <div>
                            <div className="text-xl font-semibold text-center">
                                <Skeleton.Input active style={{ width: 150 }} />
                            </div>
                            <div className="text-[#01336F] text-center text-lg font-medium mt-1">
                                <Skeleton.Input active style={{ width: 100 }} />
                            </div>
                            <hr className="my-4" />
                        </div>

                        {/* Features List Skeleton */}
                        <ul className="space-y-6">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <li
                                    key={index}
                                    className="flex items-start space-x-2 text-gray-600"
                                >
                                    <span className="text-[#01336F]">
                                        <Skeleton.Avatar active size="small" shape="circle" />
                                    </span>
                                    <span>
                                        <Skeleton.Input active style={{ width: 200 }} />
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Purchase Button Skeleton */}
                        <div className="w-full text-center mt-6">
                            <Skeleton.Button active block style={{ height: 48 }} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
