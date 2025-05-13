import { useNavigate } from "react-router-dom";

/**
 * @component Error
 * @description Componente que maneja la página de error 404
 * Características:
 * - Página de error personalizada
 * - Botón de redirección a inicio
 * - Manejo de estado de autenticación
 * - Diseño responsivo centrado
 * - Estilo minimalista
 * 
 * @returns {JSX.Element} Componente de página de error
 * 
 * @example
 * // Uso en router
 * <Route path="*" element={<Error />} />
 */
const Error = () => {
  const navigate = useNavigate();

  /**
   * Maneja la redirección y autenticación temporal
   * - Establece un token temporal
   * - Redirige al usuario a la página principal
   */
  const handleError = () => {
    navigate("/user/home"); // Redirige al panel de admin
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Título del error */}
      <h2 className="text-2xl font-bold">ERROR</h2>
      <br></br>
      <img src="src/assets/img/cryingcat.jpg" alt="Error 404" className="mb-4" />
      {/* Botón de redirección */}
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        onClick={handleError}
      >
        ERROR 404
      </button>
    </div>
  );
};

export default Error;
