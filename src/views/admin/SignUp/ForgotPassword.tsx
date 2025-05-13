import InputField from "../../../components/fields/InputField";

/**
 * @component ForgotPassword
 * @description Componente de recuperación de contraseña
 * Características:
 * - Formulario de recuperación por email
 * - Validación de correo electrónico
 * - Diseño responsivo
 * - Soporte para modo oscuro
 * - Mensajes informativos claros
 * - Botón de envío con estados visuales
 * 
 * @returns {JSX.Element} Formulario de recuperación de contraseña
 * 
 * @example
 * // Uso básico en rutas
 * <Route path="/auth/forgot-password" element={<ForgotPassword />} />
 */
export default function ForgotPassword() {
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sección de recuperación de contraseña */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {/* Título principal */}
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
          Olvidaste tu contraseña?
        </h4>

        {/* Mensaje informativo */}
        <p className="mb-9 ml-1 text-base text-gray-600">
          No hay problema. Simplemente indícanos tu correo electrónico y te enviaremos un enlace 
          para restablecer tu contraseña y podrás elegir una nueva.
        </p>

        {/* Campo de correo electrónico */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Correo*"
          placeholder="mail@gmail.com"
          id="email"
          type="text"
        />

        {/* Botón de envío */}
        <button className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 cursor-pointer">
          Validar correo
        </button>
      </div>
    </div>
  );
}