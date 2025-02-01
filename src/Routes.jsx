import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Disciplina from './pages/Disciplina';
import Professor from './pages/Professor';
import Curso from './pages/Curso';
import Disponibilidade from './pages/Disponibilidade';
import Turma from './pages/Turma';
import Configuracao from './pages/Configuracao';
import Login from './pages/Login';
import MainLayout from './components/layouts/MainLayout';
import PrivateRoute from './auth/PrivateRoute'; // Certifique-se do caminho correto

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rota de Login (não protegida) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/disciplina"
          element={
            <PrivateRoute>
              <MainLayout>
                <Disciplina />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/professor"
          element={
            <PrivateRoute>
              <MainLayout>
                <Professor />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/curso"
          element={
            <PrivateRoute>
              <MainLayout>
                <Curso />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/disponibilidade"
          element={
            <PrivateRoute>
              <MainLayout>
                <Disponibilidade />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/turma"
          element={
            <PrivateRoute>
              <MainLayout>
                <Turma />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/configuracao"
          element={
            <PrivateRoute>
              <MainLayout>
                <Configuracao />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
