import Home from "../views/Home";
import Login from "../views/Login";
import AdminDashboard from "../views/admin/Dashboard";
import Profile from "../views/admin/Profile";
import { MdHome, MdPerson, MdLock, MdOutlineShoppingCart } from "react-icons/md";
import NFTMarketplace from "../views/admin/marketplace";

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
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
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
