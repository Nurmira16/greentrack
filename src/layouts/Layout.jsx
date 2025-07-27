import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/TopBar';
import '../styles/layout.scss'; // import Sass stylesheet

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <header>
          <Topbar />
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
