import { useHerbarioList } from "./hooks/useHerbarioList";
import Banner from "./components/Banner";
import PlantCard from "../../../components/card/PlantCard";
import FiltersSection from "./components/Filters/FiltersSection";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PlantModal from "./components/PlantModal";

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
  const {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedHerbariumName,
    selectedHerbariumId,
    selectedSection,
    selectedFamilyId,
    families,
    noSpeciesMessage,
    filteredPlants,
    selectedPlant,
    isModalOpen,
    setIsModalOpen,
    handlePlantSelect,
    handleHerbariumChange,
    handleSectionChange,
    loadingImages,
  } = useHerbarioList();

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full">
        <Banner />

        <div className="mb-4 px-0 mt-4">
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
        
        <FiltersSection
          selectedHerbariumType={selectedHerbariumName}
          selectedHerbariumId={selectedHerbariumId}
          onHerbariumTypeChange={handleHerbariumChange}
          mainFamilies={families.slice(0, 3)}
          dropdownFamilies={families.slice(3)}
          selectedSection={selectedSection}
          selectedFamilyId={selectedFamilyId}
          setSelectedSection={handleSectionChange}
        />

        {loading && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-500"></div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {noSpeciesMessage && !searchTerm && (
          <div className="flex justify-center py-8">
            <p className="text-lg text-gray-500">{noSpeciesMessage}</p>
          </div>
        )}

        {filteredPlants.length === 0 && searchTerm && (
          <div className="flex justify-center py-8">
            <p className="text-lg text-gray-500">No se encontraron especies que coincidan con la búsqueda</p>
          </div>
        )}

        {(!noSpeciesMessage || searchTerm) && filteredPlants.length > 0 && (
          <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-4">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                commonName={plant.commonName}
                scientificName={plant.scientificName}
                quantity={plant.quantity}
                image={plant.image}
                onClick={() => handlePlantSelect(plant)} // Cambiamos esto
              />
            ))}
          </div>
        )}

        <PlantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plant={selectedPlant}
          loadingImages={loadingImages}
        />
      </div>
    </div>
  );
};

export default ListHerbario;