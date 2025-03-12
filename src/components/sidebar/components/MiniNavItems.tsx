interface MiniNavItemsProps {
  routes: any[];
  isAdmin?: boolean;
  handleRouteClick: (path: string) => void;
}

/**
 * @component MiniNavItems
 * @description Componente que genera elementos de navegación minimizados para la barra lateral
 * Características:
 * - Renderiza iconos para cada ruta
 * - Manejo diferenciado para rutas de administrador
 * - Soporte para tooltips con nombres de rutas
 * - Efectos hover personalizados
 * - Soporte para modo oscuro
 * - Acepta tanto iconos como cadenas de texto
 * 
 * @param {MiniNavItemsProps} props - Propiedades del componente
 * @param {any[]} props.routes - Array de rutas a mostrar
 * @param {boolean} props.isAdmin - Indica si son rutas de administrador
 * @param {Function} props.handleRouteClick - Manejador de click para navegación
 * @returns {JSX.Element} Lista de elementos de navegación minimizados
 * 
 * @example
 * // Uso básico
 * <MiniNavItems 
 *   routes={routes}
 *   handleRouteClick={(path) => navigate(path)}
 * />
 * 
 * // Uso como menú de administrador
 * <MiniNavItems 
 *   routes={adminRoutes}
 *   isAdmin={true}
 *   handleRouteClick={(path) => navigate(path)}
 * />
 */
const MiniNavItems = ({ routes, isAdmin, handleRouteClick }: MiniNavItemsProps) => (
  <>
    {routes.map((route, index) => (
      <li
        key={isAdmin ? `admin-${index}` : index}
        className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
        title={route.name}
        onClick={() =>
          handleRouteClick(isAdmin ? `admin/${route.path}` : route.path)
        }
      >
        {typeof route.icon === "string" ? (
          <span className="text-xl">{route.icon}</span>
        ) : (
          route.icon
        )}
      </li>
    ))}
  </>
);

export default MiniNavItems;