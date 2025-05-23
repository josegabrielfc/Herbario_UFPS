import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';
import { PlantImageResponse } from '../../../../../../../services/types/ResponseTypes';

interface UpdateImageFormData {
  image: File | null;
  description: string;
}

export const usePlantImageUpdateForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [plantImages, setPlantImages] = useState<PlantImageResponse[]>([]);
  const [formData, setFormData] = useState<UpdateImageFormData>({
    image: null,
    description: ''
  });

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

  const handleImageSelection = (imageId: number) => {
    setSelectedImageId(imageId);
    const selectedImage = plantImages.find(img => img.id === imageId);
    setFormData({
      image: null,
      description: selectedImage?.description || ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImageId) {
      setError('Debes seleccionar una imagen');
      return;
    }

    if (!formData.image && !formData.description) {
      setError('Debes modificar al menos un campo');
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await Services.plantImages.updateImage(selectedImageId, {
        image: formData.image as File,
        description: formData.description
      });
      
      setSuccess(true);
      setFormData({ image: null, description: '' });
      
      // Recargar las imágenes
      const updatedImages = await Services.plantImages.getByPlantId(parseInt(selectedPlantId));
      setPlantImages(updatedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la imagen');
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
    formData,
    setFormData,
    plantImages,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    handleImageSelection,
    handleSubmit
  };
};