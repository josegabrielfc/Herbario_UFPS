import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import './styles/home.css';

const Home = () => {
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
    <div className="layout-container">
      <Sidebar onStateChange={handleSidebarChange} />
      <main 
        className={`main-content ${
          isSidebarMini ? 'sidebar-mini' : 'sidebar-expanded'
        } ${isMobile ? 'mobile' : ''}`}
      >
        <h1>Contenido Principal</h1>
        <p>Dashboard</p>
      </main>
    </div>
  );
};

export default Home;
