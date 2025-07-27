import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/auth.service";

interface LogoutButtonProps {
  mini: boolean;
}

/**
 * @component LogoutButton
 * @description Botón de cierre de sesión que se muestra en el sidebar
 * Características:
 * - Solo visible para usuarios autenticados
 * - Maneja el cierre de sesión y redirección
 * - Adapta su apariencia según el modo mini del sidebar
 * 
 * @param {LogoutButtonProps} props - Propiedades del componente
 * @returns {JSX.Element | null} Botón de cierre de sesión o null si no hay usuario autenticado
 */
const LogoutButton = ({ mini }: LogoutButtonProps) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Solo mostrar si hay un usuario autenticado
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
    window.location.reload(); // Recargar para limpiar el estado de la aplicación
  };

  if (mini) {
    return (
      <button
        onClick={handleLogout}
        className="mt-6 mb-2 flex w-full items-center justify-center p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
        title="Cerrar sesión"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="mb-4 flex w-full items-center space-x-3 rounded-lg px-6 py-3 text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="font-medium">Cerrar sesión</span>
    </button>
  );
};

export default LogoutButton;