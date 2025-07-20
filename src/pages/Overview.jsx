// src/pages/Overview.jsx
import React from 'react'
import ActivitySummary from '../components/ActivitySummary'

const Overview = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <ActivitySummary />
      </div>
    </div>
  )
}

export default Overview
