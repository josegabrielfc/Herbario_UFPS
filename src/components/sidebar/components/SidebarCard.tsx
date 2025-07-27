import { ufpsColors } from '../../../utils/colors';
/**
 * @component SidebarCard
 * @description Componente de tarjeta informativa para la barra lateral
 * Características:
 * - Muestra el logo de la UFPS
 * - Incluye información de la universidad
 * - Enlace directo a la página de oferta académica
 * - Diseño con gradientes y efectos visuales
 * - Soporte para modo oscuro
 * - Efectos hover en el botón
 * 
 * @returns {JSX.Element} Componente de tarjeta para el sidebar
 * 
 * @example
 * // Uso básico del componente
 * <SidebarCard />
 */
const SideCard = () => {
  return (
    // <div
    //   className="relative mt-14 flex w-[256px] flex-col items-center justify-center rounded-[20px] pb-4"
    //   style={{
    //     background: `linear-gradient(to top left, ${ufpsColors.secondary.medium}, ${ufpsColors.secondary.base}, ${ufpsColors.secondary.light})`
    //   }}
    // >
    <div className="relative mt-14 flex w-[256px] flex-col items-center justify-center rounded-[20px] bg-gradient-to-tl from-[#DB1F26] via-[#F34343] to-brand-500 pb-4">
      {/* Contenedor del logo */}
      <div
        className="absolute -top-5 flex h-20 w-40 items-center justify-center"
      >
        <img src="/ufpslogoVertical.png" alt="UFPS Logo" />
      </div>

      {/* Contenido informativo */}
      <div className="mt-20 flex h-fit flex-col items-center">
        {/* <p
          className="text-lg font-bold text-center"
          style={{ color: ufpsColors.primary.white }}
        >
          Universidad Francisco de Paula Santander
        </p> */}

        {/* Enlace a la página de oferta académica */}
        <a
          target="blank"
          className="text-medium mt-2 block rounded-full py-[12px] px-11 text-center text-base hover:opacity-90"
          style={{
            background: ufpsColors.primary.white,
            color: ufpsColors.primary.red,
            fontWeight: 'bold'
          }}
          href="https://ww2.ufps.edu.co/"
        >
          UFPS
        </a>
      </div>

      <a href="https://ingsistemas.cloud.ufps.edu.co/" target="blank">
        <img
          src="/programaIngeSistemasBlanco.png"
          alt="Logo Ing. Sistemas"
          className="w-full pt-2 drop-shadow-2xl cursor-pointer"
        />
      </a>
    </div>
  );
};

export default SideCard;