import { useState } from "react";
import Banner from "./components/Banner";
import PlantCard from "../../../components/card/PlantCard";
import FiltersSection from "./components/Filters/FiltersSection";
import plantsData from "./variables/Datas";

/**
 * @component ListHerbario
 * @description Componente principal que muestra el listado de plantas del herbario
 * Características:
 * - Filtrado dinámico por familias de plantas
 * - Banner informativo superior
 * - Sistema de filtros con categorías principales y desplegables
 * - Visualización en grid responsivo de plantas
 * - Soporte para modo oscuro
 * - Carga dinámica de datos
 * 
 * @returns {JSX.Element} Vista principal del herbario
 * 
 * @example
 * // Uso básico
 * <ListHerbario />
 */
const ListHerbario = () => {

  // Configuración de familias para los filtros
  const families = ["Annonaceae", "Anacardiaceae", "Apiaceae", "Familia1", "Familia2", "Familia3"];
  const mainFamilies = families.slice(0, 3);      // Familias mostradas como botones
  const dropdownFamilies = families.slice(3);      // Familias en el menú desplegable

  // Estado para controlar la familia seleccionada
  const [selectedSection, setSelectedSection] = useState(families[0]);

  // Filtrado de plantas según la familia seleccionada
  const filteredNftData = plantsData.filter((plant) => plant.section === selectedSection);
  
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full">
        {/* Banner informativo */}
        <Banner />
        
        {/* Sección de filtros */}
        <FiltersSection
          mainFamilies={mainFamilies}
          dropdownFamilies={dropdownFamilies}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        {/* Grid de tarjetas de plantas */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
          {filteredNftData.map((plant, index) => (
            <PlantCard
              key={index}
              commonName={plant.commonName}
              scientificName={plant.scientificName}
              quantity={plant.quantity}
              image={plant.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListHerbario;
