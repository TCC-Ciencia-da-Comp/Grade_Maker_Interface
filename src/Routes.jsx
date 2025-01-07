// src/Router.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Disciplina from './pages/Disciplina';
import Professor from './pages/Professor';
import Curso from './pages/Curso';
import Disponibilidade from './pages/Disponibilidade';
import MainLayout from './components/MainLayout';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/disciplina"
          element={
            <MainLayout>
              <Disciplina />
            </MainLayout>
          }
        />
        <Route
          path="/professor"
          element={
            <MainLayout>
              <Professor />
            </MainLayout>
          }
        />
        <Route
          path="/curso"
          element={
            <MainLayout>
              <Curso />
            </MainLayout>
          }
        />
        <Route
          path="/disponibilidade"
          element={
            <MainLayout>
              <Disponibilidade />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
