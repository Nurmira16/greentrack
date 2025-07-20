// src/components/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Overview', path: '/' },
  { label: 'Workout', path: '/workout' },
  { label: 'Diet Plan', path: '/diet-plan' },
  { label: 'Goals', path: '/goals' },
  { label: 'My Schedule', path: '/schedule' },
  { label: 'Progress', path: '/progress' },
]

const Sidebar = () => {
  return (
    <aside className="w-60 bg-white border-r p-4">
      <h2 className="text-xl font-bold text-orange-500 mb-6">Fitness</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.label} className="mb-4">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-700 hover:text-orange-500'
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
