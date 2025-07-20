// src/layouts/Layout.jsx
import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/TopBar'


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

export default Layout
