import Home from "../views/Home";
import Login from "../views/Login";
import AdminDashboard from "../views/admin/Dashboard";
import Profile from "../views/admin/Profile";
import { MdHome, MdPerson, MdLock, MdLibraryBooks } from "react-icons/md";
import ListHerbario from "../views/admin/herbario";
import ForgotPassword from "../views/ForgotPassword";

/**
 * @constant userRoutes
 * @description Rutas públicas accesibles para usuarios no autenticados
 * - No requieren autenticación
 * - Visible en la navegación principal
 */
const userRoutes = [
  {
    name: "Inicio",
    layout: "/user",
    path: "home",
    icon: <MdLock className="h-6 w-6" />,
    component: <Home />,
  },
];

/**
 * @constant adminRoutes
 * @description Rutas protegidas para administradores
 * - Requieren autenticación
 * - Solo accesibles para usuarios con rol de administrador
 * - Visible en el panel de administración
 */
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
  {
    name: "Herbario",
    layout: "/admin",
    path: "herbario",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <ListHerbario />,
  },
];

/**
 * @constant authRoutes
 * @description Rutas relacionadas con la autenticación
 * - Incluye login y recuperación de contraseña
 * - Algunas rutas pueden estar ocultas en la navegación
 * - No requieren autenticación previa
 */
const authRoutes = [
  {
    name: "Inicio de Sesión",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <Login />,
  },
  {
    name: "Inicio de Sesión",
    layout: "/auth",
    path: "forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPassword />,
    hide: true,
  },
];

export { userRoutes, adminRoutes, authRoutes };
