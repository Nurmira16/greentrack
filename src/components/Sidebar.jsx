import { FaDumbbell, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import SidebarAI from './SideBarAI';

const Sidebar = () => {
  return (
    <>
    <aside className="sidebar">
      <div className="logo">GreenTrack</div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaDumbbell style={{ marginRight: '8px' }} />
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/diet-plan" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUtensils style={{ marginRight: '8px' }} />
            Diet Plan
          </NavLink>
        </li>
        <li>
          <NavLink to="/schedule" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCalendarAlt style={{ marginRight: '8px'}} />
            My Schedule
          </NavLink>
        </li>
      </ul>
    </aside>
    <SidebarAI/>
    </>
  );
};

export default Sidebar