import { useState, useEffect } from 'react';
import { Services } from '../../../../../../../services/services';
import { useHerbariumStore } from '../../../../stores/herbariumStore';

export const usePlantStatusForm = () => {
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const herbariums = useHerbariumStore(state => state.herbariums);
  const families = useHerbariumStore(state => state.families);
  const plants = useHerbariumStore(state => state.plants);
  const loading = useHerbariumStore(state => state.loading);
  const refreshAll = useHerbariumStore(state => state.refreshAll);
  const fetchFamiliesByHerbarium = useHerbariumStore(state => state.fetchFamiliesByHerbarium);
  const fetchPlantsByFamily = useHerbariumStore(state => state.fetchPlantsByFamily);

  useEffect(() => {
    if (selectedHerbariumId) {
      fetchFamiliesByHerbarium(parseInt(selectedHerbariumId));
      setSelectedFamilyId('');
      setSelectedPlantId('');
    }
  }, [selectedHerbariumId, fetchFamiliesByHerbarium]);

  useEffect(() => {
    if (selectedHerbariumId && selectedFamilyId) {
      fetchPlantsByFamily(parseInt(selectedHerbariumId), parseInt(selectedFamilyId));
      setSelectedPlantId('');
    }
  }, [selectedHerbariumId, selectedFamilyId, fetchPlantsByFamily]);

  const handleStatusToggle = async () => {
    if (!selectedPlantId) return;

    const plant = plants.find(p => p.id.toString() === selectedPlantId);
    if (!plant) return;

    setError(null);
    setSuccess(false);

    try {
      await Services.plants.toggleStatus(parseInt(selectedPlantId));
      setSuccess(true);
      // Recargar todos los datos incluyendo las plantas
      await refreshAll({
        herbariumId: parseInt(selectedHerbariumId),
        familyId: parseInt(selectedFamilyId)
      });
      
      alert(`La planta "${plant.common_name}" ha sido ${!plant.status ? 'activada' : 'desactivada'}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar el estado');
    }
  };

  return {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    selectedPlantId,
    setSelectedPlantId,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    handleStatusToggle
  };
};