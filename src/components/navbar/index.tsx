import { Link } from "react-router-dom";

/**
 * @interface NavbarProps
 * @description Propiedades requeridas para el componente Navbar
 */
interface NavbarProps {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
}

/**
 * @component Navbar
 * @description Barra de navegación superior con diseño responsivo y soporte para modo oscuro
 * Características:
 * - Muestra la ubicación actual en la navegación
 * - Diseño con efecto glassmorphism
 * - Soporte para tema claro/oscuro
 * - Posición fija en la parte superior
 * - Navegación mediante enlaces
 * 
 * @param {NavbarProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Navbar
 * 
 * @example
 * // Uso básico
 * <Navbar
 *   brandText="Dashboard"
 *   onOpenSidenav={() => setOpenSidenav(true)}
 * />
 * 
 * // Con modo secundario
 * <Navbar
 *   brandText="Perfil"
 *   secondary={true}
 *   onOpenSidenav={() => setOpenSidenav(true)}
 * />
 */
const Navbar = (props: NavbarProps) => {
  const { brandText } = props;

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      {/* Sección de navegación */}
      <div className="ml-[6px]">
        {/* Breadcrumb */}
        <div className="h-6 w-[224px] pt-1">
          <span className="text-sm font-normal text-navy-700 dark:text-white">
            Pagina
            <span className="mx-1 text-sm text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </span>
          <span className="text-sm font-normal capitalize text-navy-700 dark:text-white">
            {brandText}
          </span>
        </div>
        {/* Título de la página actual */}
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
