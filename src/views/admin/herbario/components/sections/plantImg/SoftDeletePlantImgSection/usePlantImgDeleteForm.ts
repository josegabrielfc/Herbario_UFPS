import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';
import { PlantImageResponse } from '../../../../../../../services/types/ResponseTypes';

export const usePlantImgDeleteForm = () => {
    const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
    const [selectedFamilyId, setSelectedFamilyId] = useState('');
    const [selectedPlantId, setSelectedPlantId] = useState('');
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    const [plantImages, setPlantImages] = useState<PlantImageResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const herbariums = useHerbariumStore(state => state.herbariums);
    const families = useHerbariumStore(state => state.families);
    const plants = useHerbariumStore(state => state.plants);
    const fetchFamiliesByHerbarium = useHerbariumStore(state => state.fetchFamiliesByHerbarium);
    const fetchPlantsByFamily = useHerbariumStore(state => state.fetchPlantsByFamily);
  
    // Cargar familias cuando cambia el herbario
    useEffect(() => {
      if (selectedHerbariumId) {
        fetchFamiliesByHerbarium(parseInt(selectedHerbariumId));
        setSelectedFamilyId('');
        setSelectedPlantId('');
        setSelectedImageId(null);
        setPlantImages([]);
      }
    }, [selectedHerbariumId, fetchFamiliesByHerbarium]);
  
    // Cargar plantas cuando cambia la familia
    useEffect(() => {
      if (selectedHerbariumId && selectedFamilyId) {
        fetchPlantsByFamily(parseInt(selectedHerbariumId), parseInt(selectedFamilyId));
        setSelectedPlantId('');
        setSelectedImageId(null);
        setPlantImages([]);
      }
    }, [selectedHerbariumId, selectedFamilyId, fetchPlantsByFamily]);
  
    // Cargar imágenes cuando se selecciona una planta
    useEffect(() => {
      const loadPlantImages = async () => {
        if (!selectedPlantId) {
          setPlantImages([]);
          return;
        }
  
        setLoading(true);
        try {
          const images = await Services.plantImages.getByPlantId(parseInt(selectedPlantId));
          setPlantImages(images);
        } catch (err) {
          setError('Error al cargar las imágenes');
          setPlantImages([]);
        } finally {
          setLoading(false);
        }
      };
  
      loadPlantImages();
    }, [selectedPlantId]);

  const handleDeleteToggle = async () => {
    if (!selectedImageId) {
      setError('Debes seleccionar una imagen');
      return;
    }

    const selectedImage = plantImages.find(img => img.id === selectedImageId);
    if (!selectedImage) return;

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await Services.plantImages.softDelete(selectedImageId);
      setSuccess(true);
      
      // Recargar las imágenes
      const updatedImages = await Services.plantImages.getByPlantId(parseInt(selectedPlantId));
      setPlantImages(updatedImages);
      
      alert(`La imagen ha sido ${!selectedImage.is_deleted ? 'eliminada' : 'restaurada'}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar el estado de eliminación');
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    selectedPlantId,
    setSelectedPlantId,
    selectedImageId,
    setSelectedImageId,
    plantImages,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    handleDeleteToggle
  };
};