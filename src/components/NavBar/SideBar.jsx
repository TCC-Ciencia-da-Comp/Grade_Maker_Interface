import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaChalkboardTeacher, FaUniversity, FaCalendarAlt } from 'react-icons/fa'; // Ícones do React Icons
import { RiMenuUnfold4Fill } from "react-icons/ri";


const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <div>
      <button onClick={toggleSidebar} style={styles.toggleButton}>
      <RiMenuUnfold4Fill size={25} />
      </button>
      <div style={{ ...styles.sidebar, left: isOpen ? '0' : '-250px' }}>
        <h2 style={styles.sidebarTitle}>Menu</h2>
        <ul style={styles.sidebarList}>
          <li>
            <Link to="/" style={styles.sidebarLink}>
              <FaHome style={styles.icon} /> Home
            </Link>
          </li>
          <li>
            <Link to="/disciplina" style={styles.sidebarLink}>
              <FaBook style={styles.icon} /> Disciplinas
            </Link>
          </li>
          <li>
            <Link to="/professor" style={styles.sidebarLink}>
              <FaChalkboardTeacher style={styles.icon} /> Professores
            </Link>
          </li>
          <li>
            <Link to="/curso" style={styles.sidebarLink}>
              <FaUniversity style={styles.icon} /> Cursos
            </Link>
          </li>
          <li>
            <Link to="/disponibilidade" style={styles.sidebarLink}>
              <FaCalendarAlt style={styles.icon} /> Disponibilidade
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  toggleButton: {
    position: 'fixed',
    top: '10px',
    left: '20px',
    fontSize: '24px',
    backgroundColor: '#3B0164',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000,
  },
  sidebar: {
    height: '100%',
    width: '250px',
    position: 'fixed',
    top: '0',
    left: '-250px', // Fora da tela inicialmente
    backgroundColor: '#3B0164',
    color: 'black',
    overflowX: 'hidden',
    transition: '0.3s',
    paddingTop: '60px',
    zIndex: 999,
  },
  sidebarTitle: {
    paddingLeft: '20px',
    margin: '0 0 20px 0',
  },
  sidebarList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center', // Alinha os ícones e o texto na mesma linha
    color: '#fff',
    padding: '10px 20px',
    textDecoration: 'none',
    transition: '0.3s',
  },
  icon: {
    marginRight: '10px', // Espaçamento entre o ícone e o texto
  },
};

export default SideBar;
