import bannerImg from "/banner.png";
import { Link } from 'react-router-dom';

/**
 * @component Banner1
 * @description Componente de banner principal para la sección del herbario
 * Características:
 * - Imagen de fondo personalizada
 * - Texto descriptivo sobre el herbario
 * - Botones de llamada a la acción
 * - Diseño responsivo para múltiples tamaños de pantalla
 * - Efectos hover en botones
 * - Texto optimizado para legibilidad
 * 
 * @returns {JSX.Element} Componente Banner
 * 
 * @example
 * // Uso básico
 * <Banner1 />
 */
const Banner1 = () => {
  //Color texto: [#E4DAFF]
  return (
    <div
      className="flex w-full flex-col rounded-md bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ 
      backgroundImage: `linear-gradient(rgba(100, 100, 100, 0.2), rgba(100, 100, 100, 0.1)), url(${bannerImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '400px'
      }}
    >
      {/* Contenedor del contenido */}
      <div className="w-full">
        {/* Título principal */}
        <h4 className="mb-[14px] max-w-full text-2xl font-bold text-white md:w-[64%] md:text-4xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
          Descubre, todas las plantas extraordinarias del herbario de la universidad
        </h4>

        {/* Descripción */}
        <p className="mb-[40px] max-w-full text-lg font-medium text-white md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
          Explora el inventario de plantas de la Universidad Francisco de Paula Santander y descubre especies únicas y fascinantes.
        </p>

        {/* Contenedor de botones */}
        <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
          {/* Botón principal */}
          <Link
              to="/user/coleccion"
              className="text-black linear rounded-md bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70"
          >
            Descubrir Ahora
          </Link>
          {/* Enlace secundario */}
            <a 
            href="https://ww2.ufps.edu.co/oferta-academica/ingenieria-agronomica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2 cursor-pointer"
            >
            Agronomia UFPS
            </a>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
