'use client'
import { useTermsGetQuery } from '@/redux/features/setting';
import React from 'react';

const TermsAndConditions = () => {
    const {data} = useTermsGetQuery(undefined);
    const terms = data?.data?.[0];
    return (
        <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        <div className="space-y-6 pr-4">
          <section>
            {/* Render HTML safely */}
            <div dangerouslySetInnerHTML={{ __html: terms?.description }} />
          </section>
        </div>
      </div>
    );
};

export default TermsAndConditions;