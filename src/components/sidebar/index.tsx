/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import SidebarCard from "../sidebar/components/SidebarCard";
import { userRoutes, adminRoutes } from "../../routes/Routes";
import { SidebarProps } from "../../types/ui";

/**
 * @component Sidebar
 * @description Componente principal de la barra lateral de navegación
 * Características:
 * - Animación de apertura/cierre
 * - Encabezado con logo del Herbario UFPS
 * - Navegación separada para usuarios y administradores
 * - Tarjeta informativa en la parte inferior
 * - Soporte para modo oscuro
 * - Diseño responsivo con control de visibilidad
 * 
 * @param {SidebarProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Sidebar
 * 
 * @example
 * // Uso básico
 * <Sidebar
 *   open={isSidebarOpen}
 *   onClose={() => setIsSidebarOpen(false)}
 * />
 */
const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      {/* Botón de cierre para móvil */}
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      {/* Encabezado del Herbario */}
      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 ">
          HERBARIO <span className="font-medium">UFPS</span>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="mt-[58px] mb-7 h-px bg-gray-300" />

      {/* Enlaces de navegación */}
      <ul className="mb-auto pt-1">
        <Links routes={userRoutes} />
      </ul>
      <ul className="mb-auto pt-1">
        <Links routes={adminRoutes} />
      </ul>
      
      {/* Tarjeta informativa */}
      <div className="flex justify-center">
        <SidebarCard />
      </div>
    </div>
  );
};

export default Sidebar;
