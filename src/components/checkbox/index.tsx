/**
 * @interface CheckboxProps
 * @description Propiedades requeridas para el componente Checkbox
 */
interface CheckboxProps {
  extra?: string;
  color?:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "teal"
    | "navy"
    | "lime"
    | "cyan"
    | "pink"
    | "purple"
    | "amber"
    | "indigo"
    | "gray";
  [x: string]: any;
}

/**
 * @component Checkbox
 * @description Componente personalizado de checkbox con múltiples variantes de color
 * Incluye:
 * - Diferentes colores cuando está marcado
 * - Soporte para modo oscuro
 * - Animación de transición
 * - Símbolo de check personalizado
 * 
 * @param {CheckboxProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Checkbox
 * 
 * @example
 * // Checkbox básico
 * <Checkbox />
 * 
 * // Checkbox con color personalizado
 * <Checkbox color="green" />
 * 
 * // Checkbox con clases adicionales
 * <Checkbox extra="my-4" color="blue" />
 */
const Checkbox = (props: CheckboxProps) => {
  const { extra, color, ...rest } = props;
  return (
    <input
      type="checkbox"
      className={`defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer
      after:content-['✓'] after:absolute after:text-white ${
        color === "red"
          ? "checked:border-none checked:bg-red-500"
          : color === "blue"
          ? "checked:border-none checked:bg-blue-500"
          : color === "green"
          ? "checked:border-none checked:bg-green-500"
          : color === "yellow"
          ? "checked:border-none checked:bg-yellow-500"
          : color === "orange"
          ? "checked:border-none checked:bg-orange-500"
          : color === "teal"
          ? "checked:border-none checked:bg-teal-500"
          : color === "navy"
          ? "checked:border-none checked:bg-navy-500"
          : color === "lime"
          ? "checked:border-none checked:bg-lime-500"
          : color === "cyan"
          ? "checked:border-none checked:bg-cyan-500"
          : color === "pink"
          ? "checked:border-none checked:bg-pink-500"
          : color === "purple"
          ? "checked:border-none checked:bg-purple-500"
          : color === "amber"
          ? "checked:border-none checked:bg-amber-500"
          : color === "indigo"
          ? "checked:border-none checked:bg-indigo-500"
          : color === "gray"
          ? "checked:border-none checked:bg-gray-500"
          : color === "brandScheme"
          ? "checked:border-none checked:bg-brand-500"
          : "checked:bg-brand-500"
      } ${extra}`}
      {...rest}
    />
  );
};

export default Checkbox;
