import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import Sidebar from "../components/Sidebar/Sidebar";
import { userRoutes, adminRoutes, authRoutes } from '../routes/Routes';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarMini, setIsSidebarMini] = useState(false);
  const location = useLocation();

  // Función para obtener el título según la ruta
const getBrandText = () => {
    const routes = [...authRoutes,...adminRoutes, ...userRoutes ];
    const currentRoute = routes.find(route => location.pathname.includes(route.path));
    return currentRoute ? currentRoute.name : 'Dashboard';
};

  const handleSidebarChange = (isMini: boolean) => {
    setIsSidebarMini(isMini);
  };

  return (
    <div className="flex h-full w-full">
      <Sidebar onStateChange={handleSidebarChange} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarMini ? 'ml-20' : 'ml-[300px]'
      }`}>
        <Navbar 
          brandText={getBrandText()} 
          onOpenSidenav={() => handleSidebarChange(!isSidebarMini)}
        />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;