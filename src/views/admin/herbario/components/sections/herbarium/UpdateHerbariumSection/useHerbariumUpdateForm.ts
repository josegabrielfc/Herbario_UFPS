import { useState } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

interface UpdateFormData {
  name: string;
  description: string;
}

export const useHerbariumUpdateForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [formData, setFormData] = useState<UpdateFormData>({
    name: '',
    description: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const herbariums = useHerbariumStore(state => state.herbariums);
  const loading = useHerbariumStore(state => state.loading);
  const fetchHerbariums = useHerbariumStore(state => state.fetchHerbariums);

  const isFormValid = () => {
    // Al menos un campo debe estar lleno para poder actualizar
    return formData.name.trim() !== '' || formData.description.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedHerbariumId) {
      setError('Debes seleccionar un herbario');
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
        ...(formData.name && { name: formData.name }),
        ...(formData.description && { description: formData.description })
      };

      await Services.herbariums.update(parseInt(selectedHerbariumId), updateData);
      setSuccess(true);
      setFormData({ name: '', description: '' });
      setSelectedHerbariumId('');
      await fetchHerbariums();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el herbario');
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    formData,
    setFormData,
    herbariums,
    loading,
    error,
    success,
    handleSubmit,
    isFormValid
  };
};