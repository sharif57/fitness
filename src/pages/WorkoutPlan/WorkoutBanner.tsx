
// import Search from "@/components/common/Search";

import dynamic from 'next/dynamic';

const Search = dynamic(() => import('@/components/common/Search'), { ssr: false });

export default function WorkoutBanner() {
  return (
    <div>
      {" "}
      <div>
        <div className="relative h-[50vh] md:h-[70vh] lg:h-[calc(100vh-2px)] xl:h-[calc(100vh-400px)] w-full flex items-center justify-center">
          {/* Background Image with Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90"
            style={{ backgroundImage: `url('/images/hero.jpg')` }}
          ></div>

          {/* Overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative text-center space-y-5 z-10">
            <h1 className="text-white lg:text-[70px] text-[40px]  font-bold w-5/6 mx-auto">
              Create your workout Plan
            </h1>
            <Search></Search>
          </div>
        </div>
      </div>
    </div>
  );
}
