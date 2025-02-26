import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const TrainerProfile: React.FC = () => {
  return (
    <div className="bg-gray-50 py-10 flex justify-center">
      <div className="bg-white shadow-md rounded-lg container mx-auto p-6 flex flex-col md:flex-row items-center md:items-start gap-">
        {/* Image Section */}
        <div className="w-full ">
          <Image
            src="/images/tainner.png" // Replace with actual image path
            alt="Ozzy Godinez"
            width={700}
            height={800}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full max-w-6xl mx-auto ">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="lg:text-[32px] font-semibold text-[25px] mt-6 lg:mt-0">OZZY GODINEZ</h1>
              <h2 className="text-gray-500 lg:text-[20px] font-semibold mt-1">
                Our Trainer
              </h2>
            </div>
            <div className="flex items-center text-orange-500">
              <Star className="w-5 h-5" />
              <span className="ml-1 text-lg font-semibold">4.9</span>
            </div>
          </div>
          <div className="space-y-10 text-start">
            <p className="text-[18px] font-normal text-[#545454] mt-4 leading-relaxed">
              Former division one college football player and experienced elite
              athlete, I bring to OEG Stretching Strength a combination of my
              passion for sports, fitness, and healing achieved through a career
              competing in track, football, basketball, as well as personal
              recovery from sports-related injuries.
            </p>
            <p className="text-[18px] font-normal text-[#545454] mt-4 leading-relaxed">
              While sports had always been present in my life since a young age,
              the desire for healing was equally important. As a small child, I
              wanted to be a doctor, telling my sick grandmother &ldquo;I&#39;m going to
              fix you.&ldquo; Sports and healing were a natural complement, and these
              two things were realized when I received a football scholarship
              from Oklahoma State University. This was an opportunity to compete
              in sports on a collegiate level, while earning a Bachelor of
              Science in Health Wellness.
            </p>
            <p className="text-[18px] font-normal text-[#545454] mt-4 leading-relaxed">
              With sports comes injury, both during and after college – right
              shoulder surgery, umbilical hernia surgery, medial and lateral
              injuries to both knees. Throughout the recovery process, I
              continued to train in the gym and work through these injuries,
              later receiving extensive education in personal training,
              Olympic-style lifting, TRX, Bosu, and other systems.
            </p>
            <p className="text-[18px] font-normal text-[#545454] mt-4 leading-relaxed">
              As a young athlete, I witnessed fundamental things missing from a
              lot of training programs, such as nutrition, hydration,
              stretching, and proper warm-up and cool-down. To this day, many
              young athletes, including pro athletes, drink sodium-filled sports
              drinks thinking they are making healthy decisions. How wrong they
              are, and I was once one of them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
