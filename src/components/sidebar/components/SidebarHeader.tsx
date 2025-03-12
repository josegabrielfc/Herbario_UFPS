import { HiX, HiMenu } from "react-icons/hi";

interface SidebarHeaderProps {
  mini: boolean;
  onClose: () => void;
  onToggleMini: () => void;
}

/**
 * @component SidebarHeader
 * @description Componente que maneja la cabecera de la barra lateral
 * Características:
 * - Modo expandido y minimizado
 * - Botón de cierre en modo expandido
 * - Botón de expansión en modo minimizado
 * - Título del herbario UFPS
 * - Soporte para modo oscuro
 * - Línea divisoria decorativa
 * 
 * @param {SidebarHeaderProps} props - Propiedades del componente
 * @param {boolean} props.mini - Estado minimizado del sidebar
 * @param {Function} props.onClose - Función para cerrar el sidebar
 * @param {Function} props.onToggleMini - Función para alternar modo minimizado
 * @returns {JSX.Element} Componente de cabecera del sidebar
 * 
 * @example
 * // Modo minimizado
 * <SidebarHeader
 *   mini={true}
 *   onClose={() => {}}
 *   onToggleMini={() => setMini(false)}
 * />
 * 
 * // Modo expandido
 * <SidebarHeader
 *   mini={false}
 *   onClose={() => setSidebarOpen(false)}
 *   onToggleMini={() => setMini(true)}
 * />
 */
const SidebarHeader = ({ mini, onClose, onToggleMini }: SidebarHeaderProps) => {
  // Renderiza la versión minimizada
  if (mini) {
    return (
      <div className="mt-[50px] flex justify-center">
        <HiMenu
          className="h-8 w-8 cursor-pointer text-navy-700 dark:text-white"
          onClick={onToggleMini}
        />
      </div>
    );
  }

  // Renderiza la versión expandida
  return (
    <>
      {/* Botón de cierre */}
      <span
        className="absolute top-4 right-4 block cursor-pointer"
        onClick={onClose}
      >
        <HiX className="h-6 w-6" />
      </span>

      {/* Título del Herbario */}
      <div className="mt-[50px] flex items-center justify-center w-full">
        <div className="mt-1 text-[26px] font-bold uppercase text-navy-700 dark:text-white text-center">
          HERBARIO <span className="font-medium">UFPS</span>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
    </>
  );
};

export default SidebarHeader;