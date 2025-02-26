
'use client'
import { useAboutGetQuery } from "@/redux/features/setting";
import React from "react";

const TermsAndConditions = () => {
  const { data } = useAboutGetQuery(undefined);
  const about = data?.data?.[0];
  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <div className="space-y-6 pr-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          {/* Render HTML safely */}
          <div dangerouslySetInnerHTML={{ __html: about?.description }} />
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
