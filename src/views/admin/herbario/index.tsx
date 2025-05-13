import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import { Plant } from './variables/types';
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
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHerbariumId, setSelectedHerbariumId] = useState<number | null>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<Plant>({} as Plant);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHerbariumName, setSelectedHerbariumName] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [families, setFamilies] = useState<{ id: number; name: string }[]>([]);
  const [allPlants, setAllPlants] = useState<Plant[]>([]); // New state for storing all plants

  const mapPlantWithImages = async (plant: { id: number; common_name: any; scientific_name: any; quantity: { toString: () => any; }; description: any; family_name: any; }) => {
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
      images: imageUrls.length ? imageUrls : [DEFAULT_IMAGE]
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

  // Modified effect for filtered plants
  useEffect(() => {
    const loadFilteredPlants = async () => {
      if (!selectedHerbariumId && selectedHerbariumName === "Todos los herbarios") {
        setPlants(allPlants);
        return;
      }

      if (!selectedHerbariumId || !selectedFamilyId) {
        setPlants([]); // Clear plants if no selection
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const plantsData = await getPlantsByIds(selectedHerbariumId, selectedFamilyId);
        
        if (!plantsData.length) {
          setPlants([]); // No plants found for this combination
          return;
        }

        const plantsWithImages = await Promise.all(
          plantsData.map(mapPlantWithImages)
        );
        setPlants(plantsWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading filtered plants');
        setPlants([]); // Clear plants on error
      } finally {
        setLoading(false);
      }
    };

    loadFilteredPlants();
  }, [selectedHerbariumId, selectedFamilyId, selectedHerbariumName]);

  // Load families when herbarium type changes
  useEffect(() => {
    const loadFamilies = async () => {
      if (selectedHerbariumId) {
        setLoading(true);
        setError(null);
        
        try {
          const familiesData = await getFamiliesByHerbariumId(selectedHerbariumId);
          // Transform the families data to match our state structure
          const familyNames = familiesData.map(family => ({
            id: family.id,
            name: family.name
          }));
          setFamilies(familyNames);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error loading families');
        } finally {
          setLoading(false);
        }
      }
    };

    loadFamilies();
    // Reset selected family when herbarium changes
    setSelectedFamilyId(null);
    setSelectedSection('');
  }, [selectedHerbariumId]);

  // Filter plants by search term
  const filteredPlants = plants.filter(plant => {
    const searchLower = searchTerm.toLowerCase();
    return plant.commonName.toLowerCase().includes(searchLower);
  });

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full">
        <Banner />
        
        <FiltersSection
          selectedHerbariumType={selectedHerbariumName}
          onHerbariumTypeChange={(id, name) => {
            setSelectedHerbariumId(id);
            setSelectedHerbariumName(name);
          }}
          mainFamilies={families.slice(0, 3)}
          dropdownFamilies={families.slice(3)}
          selectedSection={selectedSection}
          setSelectedSection={(familyId, familyName) => {
            setSelectedFamilyId(familyId);
            setSelectedSection(familyName);
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
