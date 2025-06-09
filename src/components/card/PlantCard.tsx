import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "./index";

/**
 * @interface PlantCardProps
 * @description Propiedades requeridas para el componente PlantCard
 */
interface PlantCardProps {
  image: string;
  commonName: string;
  scientificName: string;  
  quantity: string | number;  
  aditional?: string[];
  download?: string;
  extra?: string;
  status?: boolean;
  onClick?: () => void; // Add onClick handler prop
}

/**
 * @component PlantCard
 * @description Componente que muestra la información de una planta en formato de tarjeta
 * Incluye imagen, nombres común, nombre científico y cantidad
 * 
 * @param {PlantCardProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente PlantCard
 */
const PlantCard = (props: PlantCardProps) => {
  const { commonName, scientificName, quantity, image, extra, status, onClick } = props;
  
  // Estado para controlar el botón de favorito
  const [heart, setHeart] = useState(true);

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra} cursor-pointer transition-transform hover:scale-105`}
      onClick={onClick} // Add onClick to the entire card
    >
      <div className="h-full w-full">
        {/* Contenedor de la imagen y botón de favorito */}
        <div className="relative">
          <div className="relative w-full h-64">
            <img
              src={image}
              className="mb-3 h-full w-full object-cover rounded-md 3xl:h-full 3xl:w-full"
              alt={`Imagen de ${commonName}`}
            />
            {/* Botón de favorito */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking heart
                setHeart(!heart);
              }}
              className="absolute right-3 top-3 flex items-center justify-center rounded-md bg-white p-2 text-brand-500 hover:cursor-pointer"
            >
              <div className="flex h-full w-full items-center justify-center rounded-md text-xl hover:bg-gray-50">
                {heart ? (
                  <IoHeartOutline />
                ) : (
                  <IoHeart className="text-brand-500" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Sección de información de la planta */}
        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className={`text-lg font-bold ${!status ? 'text-red-500' : 'text-navy-700'}`}>
              {" "}
              Nombre Común: {commonName}{" "}
            </p>
            <p className="mt-1 text-sm font-bold text-gray-600 md:mt-2">
            {scientificName.split(/(?<=\S*\s+\S+)\s+/).map((part, index) => (
              index === 0 ? (
                <span key={`name-${index}`} className="italic font-bold">{part}</span>
              ) : (
                <span key={`author-${index}`} className="font-normal">{` ${part}`}</span>
              )
            ))}
            </p>
          </div>
          {/*    
          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-p</div>x inl</>ine-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 ">
              +5
            </span>
            {aditional.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div> */}
          {/* Sección de cantidad */}
        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-normal text-brand-500 ">
              Numero Accesiones: {quantity}
            </p>
          </div>
        </div>
        </div>
      </div>
    </Card>
  );
};

export default PlantCard;
