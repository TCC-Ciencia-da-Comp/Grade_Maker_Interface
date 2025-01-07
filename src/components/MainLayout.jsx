// src/components/MainLayout.jsx
import React, { useState } from 'react';
import NavBar from './NavBar/NavBar';
import SideBar from './NavBar/SideBar';  

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={styles.layoutContainer}>
      {/* O NavBar é sempre fixo e independente */}
      <NavBar toggleSidebar={toggleSidebar} />
      
      <div style={styles.mainContainer}>
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div
          style={{
            ...styles.contentContainer,
            marginLeft: isSidebarOpen ? '250px' : '0',
          }}
        >
          <main style={styles.mainContent}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    transition: 'margin-left 0.3s',
    padding: '20px',
    overflow: 'auto',
  },
  mainContent: {
    padding: '20px',
    transition: 'margin-left 0.3s',
  },
};

export default MainLayout;
