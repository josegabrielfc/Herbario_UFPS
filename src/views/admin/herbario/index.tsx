import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import { Plant } from './variables/types';
import PlantCard from "../../../components/card/PlantCard";
import FiltersSection from "./components/Filters/FiltersSection";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PlantModal from "./components/PlantModal";
import { getFamiliesByHerbariumId } from '../../../services/herbarium.service';
// Temporal: Simulación de datos
import plantsData from "./variables/Datas";
import plantsData2 from "./variables/Datas2";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<Plant>({} as Plant);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHerbariumId, setSelectedHerbariumId] = useState<number | null>(null);
  const [selectedHerbariumName, setSelectedHerbariumName] = useState("");
  const [families, setFamilies] = useState<string[]>([]);

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

  // Load families when herbarium type changes
  useEffect(() => {
    const loadFamilies = async () => {
      if (selectedHerbariumId) {
        const familiesData = await getFamiliesByHerbariumId(selectedHerbariumId);
        setFamilies(familiesData.map(family => family.name));
      }
    };
    loadFamilies();
  }, [selectedHerbariumId]);

  const handleHerbariumTypeChange = (id: number, name: string) => {
    setSelectedHerbariumId(id);
    setSelectedHerbariumName(name);
  };

  // Obtener familias del herbario actual
  const familiesFromPlants = plantsByHerbarium[selectedHerbarium]?.map(plant => plant.section) || [];
  const uniqueFamiliesFromPlants = [...new Set(familiesFromPlants)];
  const mainFamiliesFromPlants = uniqueFamiliesFromPlants.slice(0, 3);
  const dropdownFamiliesFromPlants = uniqueFamiliesFromPlants.slice(3);

  // Filtrar plantas por sección seleccionada y término de búsqueda
  const filteredPlants = plantsByHerbarium[selectedHerbarium]
    ?.filter(plant => plant.section === selectedSection)
    .filter(plant => {
      const searchLower = searchTerm.toLowerCase();
      return (
        plant.commonName.toLowerCase().includes(searchLower) 
        //|| plant.scientificName.toLowerCase().includes(searchLower)
      );
    }) || [];

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full">
        {/* Buscador Completo Falta darle funcionalidad */}
        <div className="mb-4 px-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar especie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <Banner />
        
        <FiltersSection
          selectedHerbariumType={selectedHerbariumName}
          onHerbariumTypeChange={handleHerbariumTypeChange}
          mainFamilies={families.slice(0, 3)}
          dropdownFamilies={families.slice(3)}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        {/* Buscador interno */}
        <div className="mb-4 px-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar especie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
          {filteredPlants.map((plant, index) => (
            <PlantCard
              key={index}
              commonName={plant.commonName}
              scientificName={plant.scientificName}
              quantity={plant.quantity}
              image={plant.image}
              onClick={() => {
                setSelectedPlant(plant);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        <PlantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plant={selectedPlant}
        />
      </div>
    </div>
  );
};

export default ListHerbario;
