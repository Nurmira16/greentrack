import React from 'react';
import Navigation from '../components/Navigation';
import '../styles/layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <div className="content">
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
