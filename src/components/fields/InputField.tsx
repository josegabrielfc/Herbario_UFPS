import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * @interface InputFieldProps
 * @description Propiedades requeridas para el componente InputField
 */
interface InputFieldProps {
  id: string;
  label: string;
  extra: string;
  placeholder: string;
  variant: string;
  state?: string;
  disabled?: boolean;
  type?: string;
}

/**
 * @component InputField
 * @description Componente de campo de entrada personalizable
 * Características:
 * - Soporte para diferentes tipos de input
 * - Manejo especial para campos de contraseña
 * - Estados de error y éxito
 * - Soporte para modo oscuro
 * - Estilos personalizables
 * - Opción para deshabilitar el campo
 * 
 * @param {InputFieldProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente InputField
 * 
 * @example
 * // Input de texto básico
 * <InputField
 *   id="username"
 *   label="Usuario"
 *   placeholder="Ingrese su usuario"
 *   type="text"
 *   variant="auth"
 * />
 * 
 * // Input de contraseña
 * <InputField
 *   id="password"
 *   label="Contraseña"
 *   placeholder="Ingrese su contraseña"
 *   type="password"
 *   variant="auth"
 * />
 */
function InputField(props: InputFieldProps) {
  const { label, id, extra, type, placeholder, variant, state, disabled } = props;
  
  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Verifica si es un campo de contraseña
  const isPassword = type === "password" && id === "password";

  return (
    <div className={`${extra}`}>
      {/* Etiqueta del campo */}
      <label
        htmlFor={id}
        className={`text-sm text-navy-700  ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        {/* Campo de entrada */}
        <input
          disabled={disabled}
          type={isPassword && showPassword ? "text" : type}
          id={id}
          maxLength={30}
          placeholder={placeholder}
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden ${
            disabled === true
              ? "!border-none !bg-gray-100"
              : state === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500"
              : state === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500"
              : "border-gray-200 "
          }`}
        />
        {/* Botón para mostrar/ocultar contraseña */}
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
