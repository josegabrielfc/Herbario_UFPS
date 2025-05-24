import { useState, useEffect } from "react";
import { Services } from "../../../services/services";
import { PlantType, Plant } from "../../types";

export const useHerbarioList = () => {
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
  const [allPlants, setAllPlants] = useState<PlantType[]>([]);
  const [noSpeciesMessage, setNoSpeciesMessage] = useState<string | null>(null);

  const mapPlantWithImages = async (plant: Plant): Promise<PlantType> => {
    const BASE_URL = 'http://localhost:3000';
    const DEFAULT_IMAGE = `${BASE_URL}/uploads/default.jpeg`;
    const images = await Services.plantImages.getByPlantId(plant.id);
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

  useEffect(() => {
    const loadInitialPlants = async () => {
      setLoading(true);
      setError(null);

      try {
        const plantsData = await Services.plants.getAll();
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
  }, []);

  useEffect(() => {
    const loadFamilies = async () => {
      if (selectedHerbariumId && selectedHerbariumId !== 0) {
        setLoading(true);
        setError(null);
        setNoSpeciesMessage(null);
        
        try {
          const familiesData = await Services.families.getByHerbariumId(selectedHerbariumId);
          
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
        const plantsData = await Services.plants.getByIds(selectedHerbariumId, selectedFamilyId);
        
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

  const filteredPlants = plants.filter(plant => {
    const searchLower = searchTerm.toLowerCase();
    return (
      plant.commonName.toLowerCase().includes(searchLower) ||
      plant.scientificName.toLowerCase().includes(searchLower)
    );
  });

  const handleHerbariumChange = (id: number, name: string) => {
    setSelectedHerbariumId(id);
    setSelectedHerbariumName(name);
    if (id === 0) {
      setFamilies([]);
      setSelectedFamilyId(null);
      setSelectedSection("");
    }
    setSearchTerm("");
  };

  const handleSectionChange = (familyId: number, familyName: string) => {
    setSelectedFamilyId(familyId);
    setSelectedSection(familyName);
    setSearchTerm("");
  };

  return {
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
    setSelectedPlant,
    handleHerbariumChange,
    handleSectionChange
  };
};