import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './../service/AuthService'; // Certifique-se do caminho correto para o AuthService

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await AuthService.getCurrentUser(); // Verifica o usuário atual
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false); // Caso erro 401 ou similar, redireciona
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>; // Pode mostrar um loader enquanto verifica
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
