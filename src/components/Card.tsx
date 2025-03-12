/**
 * @interface CardProps
 * @description Propiedades requeridas para el componente Card
 */
interface CardProps {
  title: string;
  description: string;
}

/**
 * @component Card
 * @description Componente de tarjeta básica para mostrar información
 * Características:
 * - Diseño minimalista con bordes redondeados
 * - Sombra suave para efecto de elevación
 * - Fondo blanco con borde sutil
 * - Título en negrita y descripción con color más claro
 * - Espaciado interno consistente
 * 
 * @param {CardProps} props - Propiedades del componente
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.description - Descripción o contenido de la tarjeta
 * @returns {JSX.Element} Componente Card
 * 
 * @example
 * // Uso básico
 * <Card
 *   title="Mi Título"
 *   description="Una descripción del contenido"
 * />
 */
const Card = ({ title, description }: CardProps) => {
  return (
    <div className="max-w-sm rounded-xl shadow-lg bg-white p-5 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default Card;
