import Home from "../views/Home";
import Login from "../views/admin/SignUp/Login";
import AdminDashboard from "../views/admin/Dashboard";
import Management from "../views/admin/herbario/services/ManagementView";
import { MdHome, MdPerson, MdLock, MdLibraryBooks } from "react-icons/md";
import ListHerbario from "../views/admin/herbario";
import ListHerbarioView from "../views/user/herbario";
import ForgotPassword from "../views/admin/SignUp/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";


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
  {
    name: "Herbario",
    layout: "/user",
    path: "herbario",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <ListHerbarioView />,
  },
];

/**
 * @constant adminRoutes
 * @description Rutas protegidas para administradores
 */
const adminRoutes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
  },
  {
    name: "Administracion",
    layout: "/admin",
    path: "management",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ProtectedRoute><Management /></ProtectedRoute>,
  },
  {
    name: "Herbario",
    layout: "/admin",
    path: "herbario",
    icon: <MdLibraryBooks className="h-6 w-6" />,
    component: <ProtectedRoute><ListHerbario /></ProtectedRoute>,
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
