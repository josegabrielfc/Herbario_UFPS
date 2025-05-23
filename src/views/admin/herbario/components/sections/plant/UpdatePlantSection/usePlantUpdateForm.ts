import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

interface UpdatePlantFormData {
  common_name: string;
  scientific_name: string;
  quantity: string;
  description: string;
  refs: string;
}

export const usePlantUpdateForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [formData, setFormData] = useState<UpdatePlantFormData>({
    common_name: '',
    scientific_name: '',
    quantity: '',
    description: '',
    refs: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const herbariums = useHerbariumStore(state => state.herbariums);
  const families = useHerbariumStore(state => state.families);
  const plants = useHerbariumStore(state => state.plants);
  const loading = useHerbariumStore(state => state.loading);
  const refreshAll = useHerbariumStore(state => state.refreshAll);
  const fetchFamiliesByHerbarium = useHerbariumStore(state => state.fetchFamiliesByHerbarium);
  const fetchPlantsByFamily = useHerbariumStore(state => state.fetchPlantsByFamily);

  //GET Selected Plant
  const selectedPlant = plants.find(plant => plant.id === Number(selectedPlantId));


  useEffect(() => {
    if (selectedHerbariumId) {
      fetchFamiliesByHerbarium(parseInt(selectedHerbariumId));
      setSelectedFamilyId('');
      setSelectedPlantId('');
      setFormData({
        common_name: '',
        scientific_name: '',
        quantity: '',
        description: '',
        refs: ''
      });
    }
  }, [selectedHerbariumId, fetchFamiliesByHerbarium]);

  useEffect(() => {
    if (selectedHerbariumId && selectedFamilyId) {
      fetchPlantsByFamily(parseInt(selectedHerbariumId), parseInt(selectedFamilyId));
      setSelectedPlantId('');
    }
  }, [selectedHerbariumId, selectedFamilyId, fetchPlantsByFamily]);

  const isFormValid = () => {
    return formData.common_name.trim() !== '' || 
           formData.scientific_name.trim() !== '' ||
           formData.quantity.trim() !== '' ||
           formData.description.trim() !== '' ||
           formData.refs.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlantId) {
      setError('Debes seleccionar una planta');
      return;
    }

    if (!isFormValid()) {
      setError('Debes modificar al menos un campo');
      return;
    }

    setError(null);
    setSuccess(false);

    try {
      const updateData = {
        ...(formData.common_name.trim() !== '' && { common_name: formData.common_name }),
        ...(formData.scientific_name.trim() !== '' && { scientific_name: formData.scientific_name }),
        ...(formData.quantity.trim() !== '' && { quantity: parseInt(formData.quantity) }),
        ...(formData.description.trim() !== '' && { description: formData.description }),
        ...(formData.refs.trim() !== '' && { refs: formData.refs })
      };

      await Services.plants.update(parseInt(selectedPlantId), updateData);
      setSuccess(true);
      setFormData({
        common_name: '',
        scientific_name: '',
        quantity: '',
        description: '',
        refs: ''
      });
      setSelectedPlantId('');
      setSelectedFamilyId('');
      setSelectedHerbariumId('');
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la planta');
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    selectedPlantId,
    setSelectedPlantId,
    formData,
    setFormData,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    selectedPlant,
    handleSubmit,
    isFormValid
  };
};