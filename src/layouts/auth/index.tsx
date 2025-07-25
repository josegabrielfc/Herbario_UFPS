import Footer from "../../components/footer/FooterAuthDefault";
import authImg from "/auth.webp";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "../../routes/Routes";

/**
 * @component Auth
 * @description Layout principal para las páginas de autenticación
 * Características:
 * - Manejo de rutas de autenticación
 * - Imagen de fondo personalizada
 * - Diseño responsivo
 * - Navegación dinámica
 * - Soporte para modo oscuro
 * - Botón de retorno contextual
 * 
 * @returns {JSX.Element} Layout de autenticación
 * 
 * @example
 * // Uso básico en router
 * <Route path="/auth/*" element={<Auth />} />
 */
export default function Auth() {
  /**
   * Genera las rutas de autenticación dinámicamente
   * @param {RoutesType[]} routes - Array de configuración de rutas
   * @returns {JSX.Element[]} Elementos Route generados
   */
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  // Determina si estamos en la ruta de recuperación de contraseña
  const route = window.location.pathname === "/auth/forgot-password" || window.location.pathname === "/auth/change-password";

  return (
    <div>
      {/* Contenedor principal */}
      <div className="relative float-right h-full min-h-screen w-full !bg-white">
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            {/* Layout responsivo con diferentes breakpoints */}
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                {/* Botón de navegación contextual */}
                <Link
                  to={route ? "/auth/login" : "/user/home"}
                  className="mt-0 w-max lg:pt-10"
                >
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                    d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                    fill="#A3AED0"
                    />
                  </svg>
                  <p className="ml-3 text-sm text-gray-600">
                  { route ? "Vuelve a Iniciar sesión" : "Vuelve al Inicio" }
                  </p>
                  </div>
                </Link>

                {/* Sistema de rutas */}
                <Routes>
                  {getRoutes(authRoutes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>

                {/* Imagen de fondo (visible en tablets y desktop) */}
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
