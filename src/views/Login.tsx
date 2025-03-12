import InputField from "../components/fields/InputField";
import Checkbox from "../components/checkbox";
import { useNavigate } from "react-router-dom";

/**
 * @component Login
 * @description Componente de inicio de sesión para administradores
 * Características:
 * - Formulario de autenticación
 * - Campos validados para correo y contraseña
 * - Opción "Mantener sesión"
 * - Recuperación de contraseña
 * - Diseño responsivo
 * - Soporte para modo oscuro
 * - Estados visuales en botones e inputs
 *
 * @returns {JSX.Element} Formulario de inicio de sesión
 *
 * @example
 * // Uso básico en rutas
 * <Route path="/auth/login" element={<Login />} />
 */
export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sección de inicio de sesión */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {/* Encabezado */}
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Iniciar Sesión
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Ingresa tu correo y contraseña, para ingresar como administrador!
        </p>
        {/*
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div> 
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        */}
        {/* Formulario de inicio de sesión */}
        {/* Campo de correo electrónico */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Correo*"
          placeholder="mail@gmail.com"
          id="email"
          type="text"
        />

        {/* Campo de contraseña */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Contraseña*"
          placeholder="Min. 8 caracteres"
          id="password"
          type="password"
        />

        {/* Opciones adicionales */}
        <div className="mb-4 flex items-center justify-between px-2">
          {/* Checkbox para mantener sesión */}
          <div className="flex items-center">
            <Checkbox color="green" extra="" />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Mantenerme conectado
            </p>
          </div>

          {/* Enlace para recuperar contraseña */}
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white cursor-pointer"
            onClick={() => navigate("/auth/forgot-password")}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón de envío */}
        <button className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200 cursor-pointer">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
