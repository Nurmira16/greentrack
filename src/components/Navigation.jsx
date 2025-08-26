import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChartLine, 
  FaCreditCard, 
  FaCheckSquare, 
} from 'react-icons/fa';
import '../styles/navigation.scss';

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { path: '/', label: 'Overview', icon: FaChartLine },
    { path: '/expenses', label: 'Expenses', icon: FaCreditCard },
    { path: '/todopage', label: 'To-Do App', icon: FaCheckSquare },
  ];

  if (isMobile) {
    return (
      <nav className="bottom-navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <aside className="sidebar-navigation">
      <div className="logo">
        <img alt="" />
        <p>GreenTrack</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Navigation;
