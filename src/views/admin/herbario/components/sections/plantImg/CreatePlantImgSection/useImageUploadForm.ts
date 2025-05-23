import { useState, useEffect } from 'react';
import { useUIState } from '../../../../hooks/useUIState';
import { ImageUpload, SelectedIds } from '../../../../types';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

export const useImageUploadForm = () => {
  const { loading, error, success, setError, setSuccess, setLoading, resetState } = useUIState();
  
  const {
    herbariums,
    families,
    plants,
    fetchFamiliesByHerbarium,
    fetchPlantsByFamily
  } = useHerbariumStore();
  
  const [selectedIds, setSelectedIds] = useState<SelectedIds>({
    herbariumId: '',
    familyId: '',
    plantId: ''
  });
  
  const [images, setImages] = useState<ImageUpload[]>(Array(3).fill({ file: null, description: '' }));
  
  useEffect(() => {
    if (selectedIds.herbariumId) {
      fetchFamiliesByHerbarium(parseInt(selectedIds.herbariumId));
    }
  }, [selectedIds.herbariumId, fetchFamiliesByHerbarium]);

  useEffect(() => {
    if (selectedIds.herbariumId && selectedIds.familyId) {
      fetchPlantsByFamily(
        parseInt(selectedIds.herbariumId),
        parseInt(selectedIds.familyId)
      );
    }
  }, [selectedIds.herbariumId, selectedIds.familyId, fetchPlantsByFamily]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIds.plantId) {
      setError('Debes seleccionar una planta');
      return;
    }

    const hasAtLeastOneImage = images.some(img => img.file !== null);
    if (!hasAtLeastOneImage) {
      setError('Debes seleccionar al menos una imagen');
      return;
    }

    setLoading(true);
    resetState();

    try {
      const uploadData = {
        images: images.filter(img => img.file !== null).map(img => img.file) as File[],
        descriptions: images.filter(img => img.file !== null).map(img => img.description)
      };

      await Services.plantImages.upload(parseInt(selectedIds.plantId), uploadData);
      
      setSuccess(true);
      setImages(Array(3).fill({ file: null, description: '' }));
      setSelectedIds({ herbariumId: '', familyId: '', plantId: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir las imágenes');
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedIds,
    setSelectedIds,
    families,
    plants,
    images,
    setImages,
    herbariums,
    loading,
    error,
    success,
    handleSubmit
  };
};