import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";

import {
  FaHome,
  FaBook,
  FaChalkboardTeacher,
  FaUniversity,
  FaCalendarAlt,
  FaUserGraduate,
  FaTable,
} from "react-icons/fa";
import { RiLogoutBoxLine, RiMenuUnfold4Fill, RiSettings2Fill } from "react-icons/ri";
import {
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef();
  const navigate = useNavigate()
  const onCloseAlert = () => setIsAlertOpen(false);

  const handleLogout = () => {
    AuthService.userLogout()
    navigate('/login')
    setIsAlertOpen(false);
  };

  return (
    <div>
      <button onClick={toggleSidebar} style={styles.toggleButton}>
        <RiMenuUnfold4Fill size={25} />
      </button>
      <div style={{ ...styles.sidebar, left: isOpen ? "0" : "-250px" }}>
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
            <Link to="/curso" style={styles.sidebarLink}>
              <FaUniversity style={styles.icon} /> Cursos
            </Link>
          </li>
          <li>
            <Link to="/turma" style={styles.sidebarLink}>
              <FaUserGraduate style={styles.icon} /> Turma
            </Link>
          </li>
          <li>
            <Link to="/professor" style={styles.sidebarLink}>
              <FaChalkboardTeacher style={styles.icon} /> Professores
            </Link>
          </li>
          <li>
            <Link to="/disponibilidade" style={styles.sidebarLink}>
              <FaCalendarAlt style={styles.icon} /> Disponibilidade
            </Link>
          </li>
          <li>
            <Link to="/gerador-grade" style={styles.sidebarLink}>
              <FaTable style={styles.icon} /> Gerador de Grade
            </Link>
          </li>
          <li>
            <Link to="/configuracao" style={styles.sidebarLink}>
              <RiSettings2Fill style={styles.icon} /> Configuração
            </Link>
          </li>
          <li style={{ ...styles.sidebarLink, ...styles.logoutButton }}>
            <IconButton
              aria-label="Logout"
              icon={<RiLogoutBoxLine />}
              onClick={() => setIsAlertOpen(true)}
            />
          </li>
        </ul>
      </div>

      {/* AlertDialog para confirmação de logout */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza de que deseja sair?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

const styles = {
  toggleButton: {
    position: "fixed",
    top: "10px",
    left: "20px",
    fontSize: "24px",
    backgroundColor: "#3B0164",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    zIndex: 1000,
  },
  sidebar: {
    height: "100%",
    width: "250px",
    position: "fixed",
    top: "0",
    left: "-250px",
    backgroundColor: "#3B0164",
    color: "black",
    overflowX: "hidden",
    transition: "0.3s",
    paddingTop: "60px",
    zIndex: 999,
  },
  sidebarTitle: {
    paddingLeft: "20px",
    margin: "0 0 20px 0",
  },
  sidebarList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  sidebarLink: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    transition: "0.3s",
  },
  icon: {
    marginRight: "10px",
  },
  logoutButton: {
    position: "absolute",
    bottom: "20px",
    width: "100%",
    textAlign: "center",
  },
};

export default SideBar;
