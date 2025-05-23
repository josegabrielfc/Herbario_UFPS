import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

interface PlantFormData {
  family_id: string;
  common_name: string;
  scientific_name: string;
  quantity: string;
  description: string;
  refs: string;
}

export const usePlantForm = () => {
  const [formData, setFormData] = useState<PlantFormData>({
    family_id: '',
    common_name: '',
    scientific_name: '',
    quantity: '',
    description: '',
    refs: ''
  });
  
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    herbariums,
    families,
    loading,
    refreshAll,
    fetchFamiliesByHerbarium
  } = useHerbariumStore();

  useEffect(() => {
    if (selectedHerbariumId) {
      fetchFamiliesByHerbarium(parseInt(selectedHerbariumId));
    }
  }, [selectedHerbariumId, fetchFamiliesByHerbarium]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await Services.plants.create({
        ...formData,
        family_id: parseInt(formData.family_id),
        quantity: parseInt(formData.quantity)
      });
      setSuccess(true);
      setFormData({
        family_id: '',
        common_name: '',
        scientific_name: '',
        quantity: '',
        description: '',
        refs: ''
      });
      
      // Actualizar todo el estado con el contexto completo
      await refreshAll({ 
        herbariumId: parseInt(selectedHerbariumId),
        familyId: parseInt(formData.family_id)
      });
      
      setSelectedHerbariumId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la planta');
    }
  };

  return {
    formData,
    setFormData,
    selectedHerbariumId,
    setSelectedHerbariumId,
    families,
    herbariums,
    loading,
    error,
    success,
    showTooltip,
    setShowTooltip,
    handleSubmit
  };
};