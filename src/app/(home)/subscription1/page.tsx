import Membership from '@/components/Membership'
import SubscriptionBanner from '@/pages/Subscription/SubscriptionBanner'
import React from 'react'

export default function Subscription() {
  return (
    <div>
        <SubscriptionBanner></SubscriptionBanner>
        <Membership></Membership>
    </div>
  )
}
