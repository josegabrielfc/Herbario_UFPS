import React from "react";
import { DropdownProps } from "../../types/ui";

/**
 * @function useOutsideAlerter
 * @description Hook personalizado para detectar clics fuera del elemento dropdown
 * @param {React.RefObject<any>} ref - Referencia al elemento dropdown
 * @param {Function} setX - Función para actualizar el estado de visibilidad
 */
function useOutsideAlerter(ref: React.RefObject<any>, setX: (value: boolean) => void): void {
  React.useEffect(() => {
    /**
     * Maneja el clic fuera del elemento dropdown
     * @param {MouseEvent} event - Evento del clic
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    // Agregar el event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Limpiar el event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

/**
 * @component Dropdown
 * @description Componente que implementa un menú desplegable personalizable
 * Incluye:
 * - Detección de clics fuera del dropdown para cerrarlo
 * - Animaciones personalizables
 * - Soporte para cualquier contenido como botón o contenido
 * - Control de estado para abrir/cerrar
 * 
 * @param {DropdownProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Dropdown
 * 
 * @example
 * // Dropdown básico
 * <Dropdown
 *   button={<Button>Abrir</Button>}
 *   children={<MenuItems />}
 *   classNames="bg-white shadow-lg rounded-md"
 * />
 * 
 * // Dropdown con animación personalizada
 * <Dropdown
 *   button={<Button>Abrir</Button>}
 *   children={<MenuItems />}
 *   classNames="bg-white"
 *   animation="slide-down"
 * />
 */
const Dropdown = (props: DropdownProps) => {
  const { button, children, classNames, animation } = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [openWrapper, setOpenWrapper] = React.useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
