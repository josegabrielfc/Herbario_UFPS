import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { userRoutes, adminRoutes, authRoutes } from "./routes/Routes";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/auth";
import Error from "./views/Error404";


const AppContent = () => {
  const location = useLocation();
  const isAuthenticated = true; // useAuth(); // Saber si el usuario está logueado
  
  // Check if current path matches any valid route
  const isValidRoute = [...userRoutes, ...adminRoutes, ...authRoutes].some(
    route => location.pathname === `/${route.layout.replace('/', '')}/${route.path}`
  );

  const isAuthRoute = location.pathname.startsWith('/auth');

  // If it's the root path ('/'), redirect to /user/home
  if (location.pathname === '/') {
    return <Navigate to="/user/home" replace />;
  }

  // If it's not a valid route, show error without MainLayout
  if (!isValidRoute) {
    return (
      <Routes>
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }

  // If it's an auth route, show without MainLayout
  if (isAuthRoute) {
    return (
      <Routes>
         <Route path="auth/*" element={<AuthLayout />} />
      </Routes>
    );
    /*return (
      <Routes>
        {authRoutes.map(({ path, component }, index) => (
          <Route key={index} path={`/auth/${path}`} element={component} />
        ))}
      </Routes>
    );*/
  }

  // For all other valid routes, use MainLayout
  return (
    <MainLayout>
      <Routes>
        {/* Rutas del usuario (Públicas) */}
        {userRoutes.map(({ path, component }, index) => (
          <Route key={index} path={`/user/${path}`} element={component} />
        ))}          

        {/* Rutas del Admin (Protegidas) */}
        {isAuthenticated ? (
          adminRoutes.map(({ path, component }, index) => (
            <Route key={index} path={`admin/${path}`} element={component} />
          ))
        ) : (
          <Navigate to="/auth/login" replace />
        )}
      </Routes>
    </MainLayout>
  );
};

const App = () => {

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
