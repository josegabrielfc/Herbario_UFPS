interface MiniNavItemsProps {
  routes: any[];
  pathOrigin?: string;
  handleRouteClick: (path: string) => void;
}

/**
 * @component MiniNavItems
 * @description Componente que genera elementos de navegación minimizados para la barra lateral
 */
const MiniNavItems = ({ routes, pathOrigin, handleRouteClick }: MiniNavItemsProps) => (
  <>
    {routes.map((route, index) => {
      // Solo muestra rutas válidas y no ocultas
      if (
        (route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/user" ||
        route.layout === "/") && 
        !route.hide
      ) {
        return (
          <li
            key={pathOrigin ? `${pathOrigin}-${index}` : index}
            className="cursor-pointer rounded-lg p-2 hover:bg-gray-100"
            title={route.name}
            onClick={() =>
              handleRouteClick(pathOrigin ? `${pathOrigin}/${route.path}` : route.path)
            }
          >
            {typeof route.icon === "string" ? (
              <span className="text-xl">{route.icon}</span>
            ) : (
              route.icon
            )}
          </li>
        );
      }
      return null; // Skip invalid or hidden routes
    })}
  </>
);

export default MiniNavItems;