/* eslint-disable */
import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "../../icons/DashIcon";

interface SidebarLinksProps {
  routes: RoutesType[];
}

/**
 * @component SidebarLinks
 * @description Componente que genera los enlaces de navegación para la barra lateral
 * Características:
 * - Genera enlaces dinámicamente basados en las rutas proporcionadas
 * - Marca visualmente la ruta activa
 * - Soporte para iconos personalizados
 * - Filtrado de rutas ocultas
 * - Soporte para modo oscuro
 * - Indicador visual de ruta activa
 * 
 * @param {SidebarLinksProps} props - Rutas para generar los enlaces
 * @returns {JSX.Element} Lista de enlaces para el sidebar
 * 
 * @example
 * // Uso básico
 * <SidebarLinks routes={routes} />
 */
export const SidebarLinks = (props: SidebarLinksProps): JSX.Element => {
  const location = useLocation();
  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/user" ||
        route.layout === "/"
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
