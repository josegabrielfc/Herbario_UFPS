import Home from "../views/Home";
import Login from "../views/Login";
import AdminDashboard from "../views/admin/Dashboard";
import Profile from "../views/admin/Profile";
import { MdHome, MdPerson, MdLock } from "react-icons/md";

// Rutas del usuario (Públicas)
const userRoutes = [
  {
    name: "Home",
    layout: "/user",
    path: "/",
    icon: <MdLock className="h-6 w-6" />,
    component: <Home />,
  },
];

// Rutas del admin (Requieren autenticación)
const adminRoutes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <AdminDashboard />,
    
  },
  {
    name: "Perfil",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];

// Rutas de autenticación
const authRoutes = [
  {
    name: "Inicio de Sesión",
    path: "/login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
];

export { userRoutes, adminRoutes, authRoutes };
