import { useEffect } from 'react';
import { useHerbariumStore } from '../stores/herbariumStore';
import CollapsibleSection from '../components/common/CollapsibleSection';
import CreatePlantImgSection from '../components/sections/CreatePlantImgSection/index';
import CreateHerbariumSection from '../components/sections/herbarium/CreateHerbariumSection/index';
import CreateFamilySection from '../components/sections/family/CreateFamilySection/index';
import CreatePlantSection from '../components/sections/CreatePlantSection/index';
import UpdateHerbariumSection from '../components/sections/herbarium/UpdateHerbariumSection';
import ToggleHerbariumStatusSection from '../components/sections/herbarium/ToggleHerbariumStatusSection';
import SoftDeleteHerbariumSection from '../components/sections/herbarium/SoftDeleteHerbariumSection';

const Management = () => {
  const fetchHerbariums = useHerbariumStore(state => state.fetchHerbariums);
  
  useEffect(() => {
    fetchHerbariums();
  }, [fetchHerbariums]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión del Herbario</h1>
      
      <div className="space-y-4">
        <CollapsibleSection title="Colecciones">

          <CollapsibleSection title="Crear Nuevo Herbario">
            <CreateHerbariumSection />
          </CollapsibleSection>
          
          <div className="my-4"></div>
          
          <CollapsibleSection title="Actualizar Herbario">
            <UpdateHerbariumSection/>
          </CollapsibleSection>

          <div className="my-4"></div>
          
          <CollapsibleSection title="Estado del Herbario">
            <ToggleHerbariumStatusSection />
          </CollapsibleSection>

          <div className="my-4"></div>
          
          <CollapsibleSection title="Eliminar Herbario">
            <SoftDeleteHerbariumSection />
          </CollapsibleSection>

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