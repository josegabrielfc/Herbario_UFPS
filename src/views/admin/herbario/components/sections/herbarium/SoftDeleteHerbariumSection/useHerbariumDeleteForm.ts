import { useState } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

export const useHerbariumDeleteForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const herbariums = useHerbariumStore(state => state.herbariums);
  const loading = useHerbariumStore(state => state.loading);
  const fetchHerbariums = useHerbariumStore(state => state.fetchHerbariums);

  const handleDeleteToggle = async () => {
    if (!selectedHerbariumId) return;

    const herbarium = herbariums.find(h => h.id.toString() === selectedHerbariumId);
    if (!herbarium) return;

    setError(null);
    setSuccess(false);

    try {
      await Services.herbariums.softDelete(parseInt(selectedHerbariumId));
      setSuccess(true);
      await fetchHerbariums();
      
      // Alerta del nuevo estado
      alert(`El herbario "${herbarium.name}" ha sido ${!herbarium.is_deleted ? 'eliminado' : 'restaurado'}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar el estado de eliminación');
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    herbariums,
    loading,
    error,
    success,
    handleDeleteToggle
  };
};