import { useState, useEffect } from "react";
import { Services } from "../../../../services/services";
import { PlantType } from "../../../types";
import { PlantWithImageResponse } from "../../../../services/types/ResponseTypes";

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
  const [families, setFamilies] = useState<{ id: number; name: string; status?: boolean }[]>([]);
  const [allPlants, setAllPlants] = useState<PlantType[]>([]);
  const [noSpeciesMessage, setNoSpeciesMessage] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);

  const mapPlantWithImage = (plant: PlantWithImageResponse): PlantType => {
    const BASE_URL =  import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const DEFAULT_IMAGE = `${BASE_URL}/uploads/default.jpeg`;
    const imageUrl = plant.image_url ? `${BASE_URL}${plant.image_url}` : DEFAULT_IMAGE;

    return {
      id: plant.id,
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      quantity: plant.quantity.toString(),
      description: plant.description,
      section: plant.family_name,
      image: imageUrl,
      image_id: plant.image_id,
      images: [], // Lo inicializamos vacío, se llenará al abrir el modal
      refs: plant.refs,
      herbarium_name: plant.herbarium_name,
      status: plant.status
    };
  };

  const loadInitialPlants = async () => {
    setLoading(true);
    setError(null);

    try {
      const plantsWithImages = await Services.plantImages.getAllPlantsWithImages();
      const mappedPlants = plantsWithImages.map(mapPlantWithImage);
      
      setAllPlants(mappedPlants);
      setPlants(mappedPlants);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading plants');
    } finally {
      setLoading(false);
    }
  };

  const loadFamilies = async () => {
    if (!selectedHerbariumId || selectedHerbariumId === 0) {
      setFamilies([]);
      setSelectedFamilyId(null);
      setSelectedSection("");
      setNoSpeciesMessage(null);
      return;
    }

    setLoading(true);
    setError(null);
    setNoSpeciesMessage(null);
    
    try {
      const familiesData = await Services.families.getByHerbariumId(selectedHerbariumId);
      
      if (!familiesData.length) {
        setFamilies([]);
        setSelectedFamilyId(null);
        setSelectedSection("");
        setNoSpeciesMessage("No hay especies para este tipo");
        return;
      }

      const familyNames = familiesData.map(family => ({
        id: family.id,
        name: family.name,
        status: family.status
      }));
      
      setFamilies(familyNames);
      if (familyNames.length > 0) {
        setSelectedFamilyId(familyNames[0].id);
        setSelectedSection(familyNames[0].name);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading families');
      setFamilies([]);
      setSelectedFamilyId(null);
      setSelectedSection("");
    } finally {
      setLoading(false);
    }
  };

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

      // Filtramos las plantas que ya tenemos en allPlants
      const filteredPlants = allPlants.filter(plant => 
        plantsData.some(p => p.id === plant.id)
      );
      
      setPlants(filteredPlants);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading filtered plants');
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPlantImages = async (plantId: number) => {
    setLoadingImages(true);
    try {
      const images = await Services.plantImages.getByPlantId(plantId);
      const BASE_URL =  import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const DEFAULT_IMAGE = `${BASE_URL}/uploads/default.jpeg`;
      
      return images.map(img => ({
        url: img.image_url ? `${BASE_URL}${img.image_url}` : DEFAULT_IMAGE,
        description: img.description || ""
      }));
    } catch (error) {
      console.error('Error loading plant images:', error);
      return [];
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    loadInitialPlants();
  }, []);

  useEffect(() => {
    loadFamilies();
  }, [selectedHerbariumId]);

  useEffect(() => {
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

  const handlePlantSelect = async (plant: PlantType) => {
    // Primero establecemos la planta con su imagen principal
    setSelectedPlant({
      ...plant,
      images: [{
        url: plant.image,
        description: ""
      }] // Inicialmente solo mostramos la imagen principal
    });
    setIsModalOpen(true);

    // Luego cargamos todas las imágenes
    const plantImages = await loadPlantImages(plant.id);
    
    // Actualizamos el selectedPlant con todas las imágenes
    setSelectedPlant(prev => ({
      ...prev,
      images: plantImages.length ? plantImages : [{
        url: plant.image,
        description: ""
      }]
    }));
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
    loadingImages,
    handlePlantSelect,
    setSelectedPlant,
    handleHerbariumChange,
    handleSectionChange
  };
};