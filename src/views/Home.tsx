import { ufpsColors } from "../utils/colors";
import "./styles/home.css";
import { Link } from "react-router-dom";

const CarouselLikeZone = () => {
  return (
    <div>
    <div className="flex justify-between" >
      <a href="https://ingsistemas.cloud.ufps.edu.co/" target="blank">
      <img
        src="/programaIngeSistemas.png"
        alt="Programa Ing. Sistemas"
        className="h-32 py-4 drop-shadow-2xl cursor-pointer"
      />
      </a>
      <a href="https://ww2.ufps.edu.co/" target="blank">
      <img
        src="/ufpslogoHorizontal.png"
        alt="Programa Ing. Sistemas"
        className="h-32 p-6 drop-shadow-2xl cursor-pointer"
      />
      </a>
    </div>
    
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <CarouselLikeZone />
      <div className="h-[660px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-4xl">
              <span className="block">
                Implementación efectiva de un aplicativo web destinado a la
                gestión, registro y consulta de las colecciones deshidratadas
                del
              </span>
              <span
                className="block mt-2"
                style={{ color: ufpsColors.primary.red }}
              >
                herbario de la Universidad Francisco de Paula Santander.
              </span>
            </h1>

            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Herbario UFPS - Cúcuta
            </p>

            <div className="mt-10 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Características Principales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4">
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: ufpsColors.primary.red }}
                    >
                      Gestión
                    </h3>
                    <p className="text-gray-600">
                      Administración eficiente de las colecciones botánicas y
                      sus datos asociados
                    </p>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: ufpsColors.primary.red }}
                    >
                      Consulta
                    </h3>
                    <p className="text-gray-600">
                      Acceso rápido y eficiente a la información de las
                      colecciones
                    </p>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-lg font-medium mb-2"
                      style={{ color: ufpsColors.primary.red }}
                    >
                      Registro
                    </h3>
                    <p className="text-gray-600">
                      Documentación detallada de especímenes y sus
                      características
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to="/user/coleccion"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md"
                  style={{
                    color: ufpsColors.primary.white,
                    backgroundColor: ufpsColors.primary.red,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      ufpsColors.secondary.medium;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      ufpsColors.primary.red;
                  }}
                >
                  Explorar Colección
                </Link>

                <Link
                  to="https://ww2.ufps.edu.co/oferta-academica/ingenieria-agronomica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md"
                  style={{
                    color: ufpsColors.primary.red,
                    backgroundColor: `${ufpsColors.primary.white}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F3F3";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      ufpsColors.primary.white;
                  }}
                >
                  Más Información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
