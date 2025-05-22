import { useEffect } from 'react';
import { useHerbariumStore } from '../stores/herbariumStore';
import CollapsibleSection from '../components/common/CollapsibleSection';
import CreatePlantImgSection from '../components/sections/CreatePlantImgSection/index';
import CreateHerbariumSection from '../components/sections/CreateHerbariumSection/index';
import CreateFamilySection from '../components/sections/CreateFamilySection/index';
import CreatePlantSection from '../components/sections/CreatePlantSection/index';

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

        <CollapsibleSection title="Agregar imagenes a una especie">
          <CreatePlantImgSection />
        </CollapsibleSection>

      </div>
    </div>
  );
};

export default Management;