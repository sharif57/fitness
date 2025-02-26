'use client'
import Appointment from '@/components/Appointment'
import DayBanner from '@/pages/dayRole/DayBanner'
import dynamic from "next/dynamic";
import React from 'react'


const WorkoutDayPage = dynamic(() => import("@/pages/dayRole/WorkoutDayPage"), {
  ssr: false,
});

export default function day() {
  return (
    <div>
        <DayBanner></DayBanner>
        <WorkoutDayPage></WorkoutDayPage>
        <Appointment></Appointment>
    </div>
  )
}