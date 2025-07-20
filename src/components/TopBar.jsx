// src/components/Topbar.jsx
import React from 'react'

const Topbar = () => {
  return (
    <header className="bg-white px-6 py-4 border-b flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome Back!</h1>
      <input className="border rounded px-4 py-1" placeholder="Search..." />
    </header>
  )
}

export default Topbar
