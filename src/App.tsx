import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { userRoutes, adminRoutes, authRoutes } from "./routes/Routes";
import Sidebar from "./components/sidebar/Sidebar";
import { useState, useEffect } from "react";

const App = () => {
  const isAuthenticated = true; // useAuth(); // Saber si el usuario está logueado
  const [isSidebarMini, setIsSidebarMini] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarMini(true);
      }
    };

    handleResize(); // Ejecutar al montar para establecer el estado inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarChange = (isMini: boolean) => {
    setIsSidebarMini(isMini);
  };

  return (
    <Router>
      <div className="layout-container">
        <Sidebar onStateChange={handleSidebarChange} />
        <div className={`main-content ${isSidebarMini ? 'sidebar-mini' : 'sidebar-expanded'} ${isMobile ? 'mobile' : ''}`}>
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
                <Route key={index} path={"admin/" + path} element={component} />
              ))
            ) : (
              <Navigate to="/login" replace />
            )}
            {/* Redirección de rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
