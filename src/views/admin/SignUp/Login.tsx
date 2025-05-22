import { useState } from "react";
import InputField from "../../../components/fields/InputField";
import Checkbox from "../../../components/checkbox";
import { useNavigate } from "react-router-dom";
import { login } from '../../../services/auth.service';
import SwitchField from "../../../components/fields/SwitchField";


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
 */
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Get form data using FormData API
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      //const token =
      await login({ email, password });
      navigate("/admin/herbario");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sección de inicio de sesión */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {/* Encabezado */}
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700">
          Iniciar Sesión
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Ingresa tu correo y contraseña, para ingresar como administrador!
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Correo*"
            placeholder="mail@gmail.com"
            id="email"
            type="email"

          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Contraseña*"
            placeholder="Min. 8 caracteres"
            id="password"
            type="password"
          />

        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox color="green" extra="" />
            <p className="ml-2 text-sm font-medium text-navy-700">
              Mantenerme conectado
            </p>
          </div>

          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 cursor-pointer"
            onClick={() => navigate("/auth/forgot-password")}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div>
          <SwitchField id={""} label={""} desc={""} placeholder={""} mt={undefined} mb={undefined}>
            
          </SwitchField>

        </div>

        {/* Botón de envío */}
        <button
            type="submit"
            disabled={loading}
            className={`linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
