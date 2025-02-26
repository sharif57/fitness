import Image from "next/image";
import React from "react";

export default function AboutBanner() {
  return (
    <div className="bg-[#F6F6F6] pb-8">
      <div>
        <div className="relative h-[20vh] md:h-[70vh] lg:h-[calc(80vh-100px)] xl:h-[calc(100vh-600px)] w-full flex items-center justify-center">
          {/* Background Image with Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90"
            style={{ backgroundImage: `url('/images/hero.jpg')` }}
          ></div>

          {/* Overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative text-center space-y-5 z-10">
            <h1 className="text-white lg:text-[70px] text-[40px]  font-bold w- mx-auto">
              About Us
            </h1>
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-0">
        <section className="bg-white shadow rounded-lg lg:p-10  p-4 max-w-7xl mx-auto mt-20 mb-10 ">
          {/* Title */}
          <div className="text-center">
            <h1 className="lg:text-[48px] text-4xl font-semibold">About OEG</h1>
            <p className="text-gray-500 text-[16px] font-normal mt-2">
              What is OEG Stretching Strength?
            </p>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-300" />

          {/* Content Section */}
          <div className="flex flex-col md:flex-row items-center gap-14   ">
            {/* Left Image with Circle Effect */}
            <Image
              src={"/images/Intarection.png"}
              height={460}
              width={465}
              alt="intarection"
            ></Image>

            {/* Right Text Content */}
            <div className="space-y-8 mt-12">
              <h2 className="lg:text-[32px] text-[24px] font-medium">
                We believe in doing
              </h2>
              <p className="text-gray-600 lg:text-[18px] font-normal mt-3">
                OEG FITNESS is a balanced fitness program that combines gym,
                nutrition, stretching and therapy suited to fit an average
                person looking to start/or start over, as well as all levels of
                athletes. This includes younger athletes, pro athletes, former
                athletes, weekend warriors and master athletes.
              </p>
              <p className="text-gray-600 lg:text-[18px] font-normal mt-3">
                OEG Stretching Strength has proven success in helping clients
                achieve weight loss or muscle gain and assist those in recovery
                or coping with existing chronic pain due to surgery. This
                program has also helped those with certain disabilities/diseases
                such as MS & neuropathy.
              </p>
              <p className="text-gray-600 lg:text-[18px] font-normal mt-3">
                This system is for anyone looking to make health, wellness and
                nutrition a priority in their life at any age or physical
                ability, and to achieve the highest level of quality of life.
              </p>

              {/* Key Highlights */}
              <ul className="mt-4 list-disc space-y-4  pl-6 text-gray-700">
                <li className="text-[18px] text-[#000000] ">
                  Learn from your own convenient place.
                </li>
                <li className="text-[18px] text-[#000000]">
                  We will help you every step of your journey.
                </li>
              </ul>

              {/* Stats Section */}
              <div className="flex gap-10 mt-6">
                <div>
                  <h3 className="lg:text-[36px] text-2xl font-bold text-[#345C8C]">
                    100K+{" "}
                    <span className="text-[12px] font-bold text-[#345C8C]">
                      /Growth
                    </span>
                  </h3>
                  <p className="text-gray-500 text-sm lg:w-3/5">
                    Our mission’s to drive grow & improve progress.
                  </p>
                </div>
                <div>
                  <h3 className="lg:text-[36px] text-2xl font-bold text-[#345C8C]">
                    30+{" "}
                    <span className="text-[12px] font-bold text-[#345C8C]">
                      /Years
                    </span>
                  </h3>
                  <p className="text-gray-500 text-sm lg:w-3/5">
                    Our mission’s to drive grow & improve progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
