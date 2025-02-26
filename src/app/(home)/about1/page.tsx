import Appointment from '@/components/Appointment'
import AboutBanner from '@/pages/About/AboutBanner'
import React from 'react'

export default function page() {
  return (
    <div className='space-y-8'>
        <AboutBanner></AboutBanner>
        <Appointment></Appointment>
    </div>
  )
}
