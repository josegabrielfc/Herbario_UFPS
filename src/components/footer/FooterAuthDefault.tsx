export default function Footer() {
  return (
    <div className="z-[5] mx-auto flex w-full max-w-screen-sm flex-col items-center justify-between px-[20px] pb-4 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px] xl:pb-6">
      <div className="flex items-center gap-4 mb-6 lg:mb-0">
          <img 
            src="/ufps_logo.svg" 
            alt="UFPS Logo" 
            className="h-10 w-auto"
          />
          <p className="mb-6 text-center text-sms text-gray-600 md:text-base lg:mb-0">
            ©{new Date().getFullYear()} UFPS. All Rights Reserved.
          </p>
      </div>
      <ul className="flex flex-wrap items-center sm:flex-nowrap">
        <li className="mr-12">
            <a
            href="mailto:josegabrielfc@ufps.edu.co"
            className="text-sm font-bold text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
            >
            Soporte
            </a>
        </li>
        <li className="mr-12">
          <a
            target="blank"
            href="https://github.com/josegabrielfc/api_herbario_ufps/blob/main/LICENSE.txt"
            className="text-sm font-bold text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            License
          </a>
        </li>
        <li className="mr-12">
          <a
            target="blank"
            href="https://drive.google.com/file/d/1VPr3wUwaCoOzbmUNYRUaT82MuGnBN6Uq/view?usp=drive_link"
            className="text-sm font-bold text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Manual
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="https://ww2.ufps.edu.co/oferta-academica/ingenieria-agronomica"
            className="text-sm font-bold text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
}
