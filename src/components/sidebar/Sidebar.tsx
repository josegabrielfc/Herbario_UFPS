import { useState, useEffect } from "react";
import SidebarComponent from "./components/SidebarComponent";

interface SidebarProps {
  onStateChange?: (isMini: boolean) => void;
}

/**
 * @component Sidebar
 * @description Contenedor principal de la barra lateral que maneja el estado y la lógica responsiva
 * Características:
 * - Detección automática de dispositivos móviles
 * - Manejo de estado para modo mini y expandido
 * - Control de visibilidad del sidebar
 * - Adaptación automática según el tamaño de pantalla
 * - Notificación de cambios de estado mediante callback
 * 
 * @param {SidebarProps} props - Propiedades del componente
 * @returns {JSX.Element} Contenedor del sidebar
 * 
 * @example
 * // Uso básico
 * <Sidebar />
 * 
 * // Con callback para cambios de estado
 * <Sidebar onStateChange={(isMini) => console.log('Estado mini:', isMini)} />
 */
const Sidebar = ({ onStateChange }: SidebarProps) => {
  // Estados para controlar el comportamiento del sidebar
  const [isMini, setIsMini] = useState(false);     // Modo minimizado
  const [isOpen, setIsOpen] = useState(true);      // Visibilidad del sidebar
  const [isMobile, setIsMobile] = useState(false); // Detección de dispositivo móvil

  /**
   * Efecto para detectar y manejar dispositivos móviles
   * - Verifica el ancho de la ventana
   * - Ajusta el estado según el tipo de dispositivo
   * - Configura los listeners para cambios de tamaño
   */
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        setIsMini(true);  // Mostrar versión mini en móvil por defecto
        setIsOpen(true);  // Mantener sidebar visible
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  /**
   * Maneja los cambios en el estado mini del sidebar
   * @param {boolean} newState - Nuevo estado mini
   */
  const handleMiniChange = (newState: boolean) => {
    setIsMini(newState);
    onStateChange?.(newState);
  };

  return (
    <div className="relative">
      <SidebarComponent
        open={isOpen}
        onClose={() => {
          if (isMobile) {
            setIsMini(true);  // Cambiar a versión mini en móvil
          }
          handleMiniChange(true);
        }}
        mini={isMini}
        onToggleMini={() => {
          if (isMobile) {
            setIsOpen(true);  // Mantener sidebar visible en móvil
          }
          handleMiniChange(false);
        }}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Sidebar;
