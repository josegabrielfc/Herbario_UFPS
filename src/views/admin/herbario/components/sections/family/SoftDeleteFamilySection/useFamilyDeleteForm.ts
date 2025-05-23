import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

export const useFamilyDeleteForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
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
      setSelectedFamilyId(''); // Reset familia seleccionada cuando cambia el herbario
    }
  }, [selectedHerbariumId, fetchFamiliesByHerbarium]);

  const handleDeleteToggle = async () => {
    if (!selectedFamilyId) return;

    const family = families.find(f => f.id.toString() === selectedFamilyId);
    if (!family) return;

    setError(null);
    setSuccess(false);

    try {
      await Services.families.softDelete(parseInt(selectedFamilyId));
      setSuccess(true);
      await refreshAll({ 
        herbariumId: parseInt(selectedHerbariumId),
        familyId: parseInt(selectedFamilyId) 
      });
      
      alert(`La familia "${family.name}" ha sido ${!family.is_deleted ? 'eliminada' : 'restaurada'}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar el estado de eliminación');
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    herbariums,
    families,
    loading,
    error,
    success,
    handleDeleteToggle
  };
};