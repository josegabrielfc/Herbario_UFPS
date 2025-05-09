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
    <div className="relative mt-14 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-tl from-[#FF8686] via-[#F34343] to-brand-500 pb-4">
      {/* Contenedor del logo */}
      <div className="absolute -top-10 flex h-20 w-20 items-center justify-center border-[4px] border-white bg-gradient-to-b from-[#FF8686] to-brand-500">
        <img src="/ufps_logo.svg" alt="UFPS Logo" className="h-16 w-16" />
      </div>

      {/* Contenido informativo */}
      <div className="mt-16 flex h-fit flex-col items-center">
        <p className="text-lg font-bold text-center text-white">
          Universidad Francisco de Paula Santander
        </p>
        <p className="mt-1 px-4 text-center text-sm text-white">
          Ingresa a nuestra pagina de oferta academica para mas informacion
        </p>

        {/* Enlace a la página de oferta académica */}
        <a
          target="blank"
          className="text-medium mt-7 block rounded-full bg-gradient-to-b from-white/50 to-white/10 py-[12px] px-11 text-center text-base text-white hover:bg-gradient-to-b hover:from-white/40 hover:to-white/5 "
          href="https://ww2.ufps.edu.co/oferta-academica/ingenieria-agronomica"
        >
          UFPS
        </a>
      </div>
    </div>
  );
};

export default SideCard;
