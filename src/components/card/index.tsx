import { JSX } from "react";

/**
 * @interface CardProps
 * @description Propiedades requeridas para el componente Card
 */
interface CardProps {
  variant?: string;
  extra?: string;
  children?: JSX.Element | any[];
  [x: string]: any;
}

/**
 * @component Card
 * @description Componente base para crear tarjetas con estilos predefinidos
 * Incluye bordes redondeados, sombras y soporte para modo oscuro
 * 
 * @param {CardProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Card
 */
function Card(props: CardProps) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`relative flex flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] !border-[#ffffff33] !bg-navy-800  shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
