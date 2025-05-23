import { useState } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

interface HerbariumFormData {
  name: string;
  description: string;
}

export const useHerbariumForm = () => {
  const [formData, setFormData] = useState<HerbariumFormData>({
    name: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const refreshAll = useHerbariumStore(state => state.refreshAll);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await Services.herbariums.create(formData);
      setSuccess(true);
      setFormData({ name: '', description: '' });
      await refreshAll(); // Actualiza todo el estado global
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el herbario');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    success,
    handleSubmit
  };
};