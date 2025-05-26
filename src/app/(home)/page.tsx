"use client"
import Appointment from "@/components/Appointment";
import Banner from "@/components/Banner";
import HealthyFood from "@/components/HealthyFood";
import Membership from "@/components/Membership";
import TrainerProfile from "@/components/TrainerProfile";

export default function Home() {
  return (
    <div className=" space-y-4 ">
     <Banner></Banner>
     <HealthyFood></HealthyFood>
     <Membership></Membership>
     <Appointment></Appointment>
     <TrainerProfile></TrainerProfile>
    </div>
  );
}
