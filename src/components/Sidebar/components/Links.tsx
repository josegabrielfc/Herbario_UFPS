/* eslint-disable */
import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

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
 * @param {RoutesType[]} props - Rutas para generar los enlaces
 * @returns {JSX.Element} Lista de enlaces para el sidebar
 * 
 * @example
 * // Uso básico
 * <SidebarLinks routes={routes} />
 */
export const SidebarLinks = (props: { routes: RoutesType[] }):JSX.Element => {
  const location = useLocation();
  const { routes } = props;

  /**
   * Verifica si la ruta proporcionada es la activa actualmente
   * @param {string} routeName - Nombre de la ruta a verificar
   * @returns {boolean} True si la ruta está activa
   */
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  /**
   * Genera los elementos de enlace basados en las rutas proporcionadas
   * @param {RoutesType[]} routes - Array de rutas a procesar
   * @returns {JSX.Element[]} Array de elementos Link
   */
  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      // Solo muestra rutas válidas y no ocultas
      if (
        (route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/user" ||
        route.layout === "/") && 
        !route.hide
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                {/* Icono del enlace */}
                <span
                  className={`${
                    activeRoute(route.path)
                      ? "font-bold text-brand-500 "
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <div></div>}{" "}
                </span>
                {/* Nombre del enlace */}
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path)
                      ? "font-bold text-navy-700 "
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {/* Indicador visual de ruta activa */}
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
