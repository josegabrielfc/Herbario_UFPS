import './styles/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-[660px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-4xl">
            <span className="block">Implementación efectiva de un aplicativo web destinado a la gestión, registro y consulta de las colecciones deshidratadas del</span>
            <span className="block text-green-600 mt-2">herbario de la Universidad Francisco de Paula Santander.</span>
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
                  <h3 className="text-lg font-medium text-green-600 mb-2">Gestión</h3>
                  <p className="text-gray-600">
                    Administración eficiente de las colecciones botánicas y sus datos asociados
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-green-600 mb-2">Consulta</h3>
                  <p className="text-gray-600">
                    Acceso rápido y eficiente a la información de las colecciones
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-green-600 mb-2">Registro</h3>
                  <p className="text-gray-600">
                    Documentación detallada de especímenes y sus características
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/user/coleccion"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Explorar Colección
              </Link>
                <Link
                to="https://ww2.ufps.edu.co/oferta-academica/ingenieria-agronomica"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                >
                Más Información
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;