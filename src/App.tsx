import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { userRoutes, adminRoutes, authRoutes } from "./routes/Routes";
import MainLayout from  "./layouts/MainLayout";

const App = () => {
  const isAuthenticated = true; // useAuth(); // Saber si el usuario está logueado

  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Rutas del usuario (Públicas) */}
          {userRoutes.map(({ path, component }, index) => (
            <Route key={index} path={path} element={component} />
          ))}

          {/* Rutas de autenticación */}
          {authRoutes.map(({ path, component }, index) => (
            <Route key={index} path={path} element={component} />
          ))}

          {/* Rutas del Admin (Protegidas) */}
          {isAuthenticated ? (
            adminRoutes.map(({ path, component }, index) => (
              <Route key={index} path={"admin/"+path} element={component} />
            ))
          ) : (
            <Navigate to="/login" replace />
          )}
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
