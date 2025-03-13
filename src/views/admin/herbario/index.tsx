import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import PlantCard from "../../../components/card/PlantCard";
import FiltersSection from "./components/Filters/FiltersSection";
// Temporal: Simulación de datos
import plantsData from "./variables/Datas";
import plantsData2 from "./variables/Datas2";

interface Plant {
  section: string;
  commonName: string;
  scientificName: string;
  quantity: string;
  image: string;
}

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
  // Estados principales
  const [herbariumTypes, setHerbariumTypes] = useState<string[]>([]);
  const [selectedHerbarium, setSelectedHerbarium] = useState<string>("");
  const [plantsByHerbarium, setPlantsByHerbarium] = useState<Record<string, Plant[]>>({});
  const [selectedSection, setSelectedSection] = useState<string>("");

  // Simular la carga inicial de tipos de herbario (futuro endpoint 1)
  useEffect(() => {
    const fetchHerbariumTypes = async () => {
      // TODO: Reemplazar con llamada API real
      const types = ["Herbario1", "Herbario2"];
      setHerbariumTypes(types);
      setSelectedHerbarium(types[0]); // Seleccionar el primero por defecto
    };

    fetchHerbariumTypes();
  }, []);

  // Simular la carga de plantas por tipo de herbario (futuro endpoint 2)
  useEffect(() => {
    const fetchPlantsByHerbarium = async () => {
      if (!selectedHerbarium) return;

      // TODO: Reemplazar con llamada API real
      const currentPlantsData = selectedHerbarium === "Herbario1" ? plantsData : plantsData2;
      
      setPlantsByHerbarium(prev => ({
        ...prev,
        [selectedHerbarium]: currentPlantsData
      }));

      // Establecer la primera sección como seleccionada
      const sections = [...new Set(currentPlantsData.map(plant => plant.section))];
      setSelectedSection(sections[0]);
    };

    fetchPlantsByHerbarium();
  }, [selectedHerbarium]);

  // Obtener familias del herbario actual
  const families = plantsByHerbarium[selectedHerbarium]?.map(plant => plant.section) || [];
  const uniqueFamilies = [...new Set(families)];
  const mainFamilies = uniqueFamilies.slice(0, 3);
  const dropdownFamilies = uniqueFamilies.slice(3);

  // Filtrar plantas por sección seleccionada
  const filteredPlants = plantsByHerbarium[selectedHerbarium]?.filter(
    plant => plant.section === selectedSection
  ) || [];

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full">
        <Banner />
        
        <FiltersSection
          herbariumTypes={herbariumTypes}
          selectedHerbariumType={selectedHerbarium}
          onHerbariumTypeChange={(type) => {
            setSelectedHerbarium(type);
          }}
          mainFamilies={mainFamilies}
          dropdownFamilies={dropdownFamilies}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
          {filteredPlants.map((plant, index) => (
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
