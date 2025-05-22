import { useState } from 'react';
import { Services } from '../../../../../../services/services';
import { useHerbariumStore } from '../../../stores/herbariumStore';

interface FamilyFormData {
  name: string;
  description: string;
  herbarium_type_id: string;
}

export const useFamilyForm = () => {
  const [formData, setFormData] = useState<FamilyFormData>({
    name: '',
    description: '',
    herbarium_type_id: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const herbariums = useHerbariumStore(state => state.herbariums);
  const loading = useHerbariumStore(state => state.loading);
  const fetchHerbariums = useHerbariumStore(state => state.fetchHerbariums);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await Services.families.create({
        ...formData,
        herbarium_type_id: parseInt(formData.herbarium_type_id)
      });
      setSuccess(true);
      setFormData({ name: '', description: '', herbarium_type_id: '' });
      await fetchHerbariums();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la familia');
    }
  };

  return {
    formData,
    setFormData,
    herbariums,
    loading,
    error,
    success,
    handleSubmit
  };
};