import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import { PlantType } from "../../types";
import PlantCard from "../../../components/card/PlantCard";
import FiltersSection from "./components/Filters/FiltersSection";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PlantModal from "./components/PlantModal";
import { getAllPlants, getPlantsByIds, getPlantImages, getFamiliesByHerbariumId } from '../../../services/herbarium.service';

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
  const [plants, setPlants] = useState<PlantType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHerbariumId, setSelectedHerbariumId] = useState<number | null>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<PlantType>({} as PlantType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHerbariumName, setSelectedHerbariumName] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [families, setFamilies] = useState<{ id: number; name: string }[]>([]);
  const [allPlants, setAllPlants] = useState<PlantType[]>([]); // New state for storing all plants
  const [noSpeciesMessage, setNoSpeciesMessage] = useState<string | null>(null);

  const mapPlantWithImages = async (plant: {
    herbarium_name: any;
    refs: any; id: number; common_name: any; scientific_name: any; quantity: { toString: () => any; }; description: any; family_name: any; 
}) => {
    const BASE_URL = 'http://localhost:3000';
    const DEFAULT_IMAGE = `${BASE_URL}/uploads/default.jpeg`;
    
    const images = await getPlantImages(plant.id);
    const imageUrls = images.map(img => 
      img.image_url ? `${BASE_URL}${img.image_url}` : DEFAULT_IMAGE
    );

    return {
      id: plant.id,
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      quantity: plant.quantity.toString(),
      description: plant.description,
      section: plant.family_name,
      image: imageUrls[0] || DEFAULT_IMAGE,
      images: imageUrls.length ? imageUrls : [DEFAULT_IMAGE],
      refs: plant.refs,
      herbarium_name: plant.herbarium_name
    };
  };

  // Load all plants only on initial mount
  useEffect(() => {
    const loadInitialPlants = async () => {
      setLoading(true);
      setError(null);

      try {
        const plantsData = await getAllPlants();
        const plantsWithImages = await Promise.all(
          plantsData.map(mapPlantWithImages)
        );
        setAllPlants(plantsWithImages);
        setPlants(plantsWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading plants');
      } finally {
        setLoading(false);
      }
    };

    loadInitialPlants();
  }, []); // Only runs on mount

  // Modified effect for loading families
  useEffect(() => {
    const loadFamilies = async () => {
      if (selectedHerbariumId && selectedHerbariumId !== 0) {
        setLoading(true);
        setError(null);
        setNoSpeciesMessage(null);
        
        try {
          const familiesData = await getFamiliesByHerbariumId(selectedHerbariumId);
          
          if (!familiesData.length) {
            setFamilies([]);
            setNoSpeciesMessage("No hay especies para este tipo");
            return;
          }

          const familyNames = familiesData.map(family => ({
            id: family.id,
            name: family.name
          }));
          
          setFamilies(familyNames);
          // Automatically select first family
          if (familyNames.length > 0) {
            setSelectedFamilyId(familyNames[0].id);
            setSelectedSection(familyNames[0].name);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error loading families');
        } finally {
          setLoading(false);
        }
      }
    };

    loadFamilies();
  }, [selectedHerbariumId]);

  // Modified effect for filtered plants
  useEffect(() => {
    const loadFilteredPlants = async () => {
      if (!selectedHerbariumId && selectedHerbariumName === "Todas las colecciones") {
        setPlants(allPlants);
        setNoSpeciesMessage(null);
        return;
      }

      if (!selectedHerbariumId || !selectedFamilyId) {
        setPlants([]);
        return;
      }

      setLoading(true);
      setError(null);
      setNoSpeciesMessage(null);

      try {
        const plantsData = await getPlantsByIds(selectedHerbariumId, selectedFamilyId);
        
        if (!plantsData.length) {
          setPlants([]);
          setNoSpeciesMessage("No hay especies agregadas para esta familia");
          return;
        }

        const plantsWithImages = await Promise.all(
          plantsData.map(mapPlantWithImages)
        );
        setPlants(plantsWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading filtered plants');
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };

    loadFilteredPlants();
  }, [selectedHerbariumId, selectedFamilyId, selectedHerbariumName]);

  // Modify filteredPlants to include search functionality
  const filteredPlants = plants.filter(plant => {
    const searchLower = searchTerm.toLowerCase();
    return (
      plant.commonName.toLowerCase().includes(searchLower) ||
      plant.scientificName.toLowerCase().includes(searchLower)
    );
  });

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
          onHerbariumTypeChange={(id, name) => {
            setSelectedHerbariumId(id);
            setSelectedHerbariumName(name);
            if (id === 0) {
              setFamilies([]);
              setSelectedFamilyId(null);
              setSelectedSection("");
            }
            // Clear search when changing herbarium type
            setSearchTerm("");
          }}
          mainFamilies={families.slice(0, 3)}
          dropdownFamilies={families.slice(3)}
          selectedSection={selectedSection}
          setSelectedSection={(familyId, familyName) => {
            setSelectedFamilyId(familyId);
            setSelectedSection(familyName);
            // Clear search when changing family
            setSearchTerm("");
          }}
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
            {filteredPlants.map((plant, index) => (
              <PlantCard
                key={plant.id || index}
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
        )}

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
