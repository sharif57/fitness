'use client'
import Appointment from '@/components/Appointment'
// import SelectWorkoutPlan from '@/pages/WorkoutPlan/SelectWorkoutPlan'
import WorkoutBanner from '@/pages/WorkoutPlan/WorkoutBanner'
import React from 'react'

import dynamic from 'next/dynamic';

const SelectWorkoutPlan = dynamic(() => import('@/pages/WorkoutPlan/SelectWorkoutPlan'), { ssr: false });


export default function page() {
  return (
    <div className='space-y-8'>
        <WorkoutBanner></WorkoutBanner>
        {/* <SelectWorkoutPlan></SelectWorkoutPlan> */}
        <Appointment></Appointment>
    </div>
  )
}
