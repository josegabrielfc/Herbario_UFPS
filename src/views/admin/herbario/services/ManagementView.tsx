import { useEffect } from 'react';
import CreateHerbariumSection from '../components/Herbarium/Management/CreateHerbariumSection';
import CreateFamilySection from '../components/Herbarium/Management/CreateFamilySection';
import CreatePlantSection from '../components/Herbarium/Management/CreatePlantSection';
import CollapsibleSection from '../components/Herbarium/Management/CollapsibleSection';
import { useHerbariumStore } from '../stores/herbariumStore';

const Management = () => {
  const fetchHerbariums = useHerbariumStore(state => state.fetchHerbariums);
  
  useEffect(() => {
    fetchHerbariums();
  }, [fetchHerbariums]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión del Herbario</h1>
      
      <div className="space-y-4">
        <CollapsibleSection title="Crear Nuevo Herbario">
          <CreateHerbariumSection />
        </CollapsibleSection>

        <CollapsibleSection title="Crear Nueva Familia">
          <CreateFamilySection />
        </CollapsibleSection>

        <CollapsibleSection title="Crear Nueva Planta">
          <CreatePlantSection />
        </CollapsibleSection>

      </div>
    </div>
  );
};

export default Management;