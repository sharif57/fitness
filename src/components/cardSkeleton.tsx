'use client'
import { Skeleton, Card } from 'antd';
import React from 'react';

export default function CardSkeleton() {
    const fakeData = Array.from({ length: 3 });

    return (
        <div>
            <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="lg:text-[40px] text-2xl font-semibold">
                        <Skeleton.Input active style={{ width: 200 }} />
                    </h2>
                    <Skeleton.Input active style={{ width: 300 }} />
                </div>

                {/* Card Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeData.map((_, index) => (
                        <Card key={index} className="shadow-lg rounded-xl overflow-hidden">
                            <Skeleton.Image className="w-full h-[290px] rounded-lg" />
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <Skeleton.Input active style={{ width: 150 }} />
                                    <Skeleton.Input active style={{ width: 100 }} />
                                </div>
                                <Skeleton paragraph={{ rows: 2 }} active />
                            </div>
                            <div className="p-4 flex justify-between gap-4">
                                <Skeleton.Button active block style={{ height: 40 }} />
                                <Skeleton.Button active block style={{ height: 40 }} />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}


