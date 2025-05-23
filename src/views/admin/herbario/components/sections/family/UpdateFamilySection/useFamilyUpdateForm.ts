import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

interface UpdateFamilyFormData {
  name: string;
  description: string;
}

export const useFamilyUpdateForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [formData, setFormData] = useState<UpdateFamilyFormData>({
    name: '',
    description: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const herbariums = useHerbariumStore(state => state.herbariums);
  const families = useHerbariumStore(state => state.families);
  const loading = useHerbariumStore(state => state.loading);
  const refreshAll = useHerbariumStore(state => state.refreshAll);
  const fetchFamiliesByHerbarium = useHerbariumStore(state => state.fetchFamiliesByHerbarium);

  useEffect(() => {
    if (selectedHerbariumId) {
      fetchFamiliesByHerbarium(parseInt(selectedHerbariumId));
      setSelectedFamilyId('');
      setFormData({ name: '', description: '' });
    }
  }, [selectedHerbariumId, fetchFamiliesByHerbarium]);

  const isFormValid = () => {
    // Al menos un campo debe tener contenido
    return formData.name.trim() !== '' || formData.description.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFamilyId) {
      setError('Debes seleccionar una familia');
      return;
    }

    if (!isFormValid()) {
      setError('Debes modificar al menos un campo');
      return;
    }

    setError(null);
    setSuccess(false);

    try {
      // Solo enviamos los campos que tienen contenido
      const updateData = {
        ...(formData.name.trim() !== '' && { name: formData.name }),
        ...(formData.description.trim() !== '' && { description: formData.description })
      };

      await Services.families.update(parseInt(selectedFamilyId), updateData);
      setSuccess(true);
      setFormData({ name: '', description: '' });
      setSelectedFamilyId('');
      setSelectedHerbariumId('');
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la familia');
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    formData,
    setFormData,
    herbariums,
    families,
    loading,
    error,
    success,
    handleSubmit,
    isFormValid
  };
};