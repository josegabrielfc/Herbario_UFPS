import { useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import MiniNavItems from "./MiniNavItems";
import Links from "./Links";
import SidebarCard from "./SidebarCard";
import { userRoutes, adminRoutes, authRoutes } from "../../../routes/Routes";

interface SidebarComponentProps {
  open: boolean;
  onClose: () => void;
  mini: boolean;
  onToggleMini: () => void;
  isMobile?: boolean;
}

/**
 * @component SidebarComponent
 * @description Componente principal de la barra lateral que maneja la navegación
 * Características:
 * - Modo expandido y minimizado
 * - Soporte para dispositivos móviles
 * - Navegación para usuarios, administradores y autenticación
 * - Animaciones de transición
 * - Soporte para modo oscuro
 * - Tarjeta informativa opcional
 * 
 * @param {SidebarComponentProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de barra lateral
 * 
 * @example
 * // Uso básico
 * <SidebarComponent
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   mini={isMini}
 *   onToggleMini={() => setIsMini(!isMini)}
 * />
 * 
 * // Uso en móvil
 * <SidebarComponent
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   mini={false}
 *   onToggleMini={() => {}}
 *   isMobile={true}
 * />
 */
const SidebarComponent = (props: SidebarComponentProps) => {
  const { open, onClose, mini, onToggleMini, isMobile } = props;
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  // Filter userRoutes based on authentication status
  const filteredUserRoutes = userRoutes.filter(route => {
    if (route.path === 'herbario' && route.layout === '/user') {
      return !isAuthenticated; // Show herbario only when NOT authenticated
    }
    return true; // Always show other routes
  });

  /**
   * Maneja la navegación a la ruta especificada
   * @param {string} path - Ruta a la que se navegará
   */
  const handleRouteClick = (path: string) => navigate(path);

  // Clases CSS dinámicas para el sidebar
  const sidebarClasses = `
    sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col 
    bg-white pb-10 shadow-2xl shadow-white/5 transition-all 
    md:!z-50 lg:!z-50 xl:!z-0 
    ${open ? "translate-x-0" : "-translate-x-96"}
    ${mini ? "w-20" : "w-[300px]"}
    ${isMobile && !mini ? "w-screen" : ""}
  `;

  return (
    <div className={sidebarClasses}>
      {/* Cabecera del sidebar con controles */}
      <SidebarHeader
        mini={mini}
        onClose={onClose}
        onToggleMini={onToggleMini}
      />

      {/* Lista de enlaces de navegación */}
      <ul className="mb-auto pt-1">
        {mini ? (
          // Modo minimizado: muestra solo iconos
          <div className="flex flex-col items-center space-y-4 pt-4">
            <MiniNavItems
              routes={filteredUserRoutes}
              pathOrigin="user"
              handleRouteClick={handleRouteClick}
            />
            {isAuthenticated && (
              <MiniNavItems
                routes={adminRoutes}
                pathOrigin="admin"
                handleRouteClick={handleRouteClick}
              />
            )}
            <MiniNavItems
              routes={authRoutes}
              handleRouteClick={handleRouteClick}
              pathOrigin="auth"
            />
          </div>
        ) : (
          // Modo expandido: muestra enlaces completos
          <>
            <Links routes={filteredUserRoutes} />
            {isAuthenticated && <Links routes={adminRoutes} /> }
            <Links routes={authRoutes} />
          </>
        )}
      </ul>

      {/* Tarjeta informativa (solo en modo expandido) */}
      {!mini && (
        <div className="flex justify-center">
          <SidebarCard />
        </div>
      )}
    </div>
  );
};

export default SidebarComponent;