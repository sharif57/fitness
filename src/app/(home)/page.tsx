"use client"
import Appointment from "@/components/Appointment";
import Banner from "@/components/Banner";
import HealthyFood from "@/components/HealthyFood";
import Membership from "@/components/Membership";
import TrainerProfile from "@/components/TrainerProfile";
import WorkoutPlan from "@/components/WorkoutPlan";

export default function Home() {
  return (
    <div className=" space-y-4 ">
     <Banner></Banner>
     <WorkoutPlan></WorkoutPlan>
     <Membership></Membership>
     <HealthyFood></HealthyFood>
     <Appointment></Appointment>
     <TrainerProfile></TrainerProfile>
    </div>
  );
}
