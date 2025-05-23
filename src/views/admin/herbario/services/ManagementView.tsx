import { useEffect } from "react";
import { useHerbariumStore } from "../stores/herbariumStore";
import CollapsibleSection from "../components/common/CollapsibleSection";
import CreatePlantImgSection from "../components/sections/plantImg/CreatePlantImgSection/index";
import CreateHerbariumSection from "../components/sections/herbarium/CreateHerbariumSection/index";
import CreateFamilySection from "../components/sections/family/CreateFamilySection/index";
import CreatePlantSection from "../components/sections/plant/CreatePlantSection/index";
import UpdateHerbariumSection from "../components/sections/herbarium/UpdateHerbariumSection";
import ToggleHerbariumStatusSection from "../components/sections/herbarium/ToggleHerbariumStatusSection";
import SoftDeleteHerbariumSection from "../components/sections/herbarium/SoftDeleteHerbariumSection";
import ToggleFamilyStatusSection from "../components/sections/family/ToggleFamilyStatusSection";
import SoftDeleteFamilySection from "../components/sections/family/SoftDeleteFamilySection";
import UpdateFamilySection from "../components/sections/family/UpdateFamilySection";
import UpdatePlantSection from "../components/sections/plant/UpdatePlantSection";
import UpdatePlantImgSection from "../components/sections/plantImg/UpdatePlantImgSection";
import TogglePlantStatusSection from "../components/sections/plant/TogglePlantStatusSection";
import SoftDeletePlantSection from "../components/sections/plant/SoftDeletPlantSection";
import TogglePlantImgStatusSection from "../components/sections/plantImg/TogglePlantImgStatusSection";
import SoftDeletePlantImgSection from "../components/sections/plantImg/SoftDeletePlantImgSection";

const Management = () => {
  const fetchHerbariums = useHerbariumStore((state) => state.fetchHerbariums);

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
            <UpdateHerbariumSection />
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

        <CollapsibleSection title="Familias">
          <CollapsibleSection title="Crear Nueva Familia">
            <CreateFamilySection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Actualizar Familia">
            <UpdateFamilySection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Estado de la Familia">
            <ToggleFamilyStatusSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Eliminar Familia">
            <SoftDeleteFamilySection />
          </CollapsibleSection>
        </CollapsibleSection>

        <CollapsibleSection title="Plantas">
          <CollapsibleSection title="Crear Nueva Planta">
            <CreatePlantSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Editar Planta">
            <UpdatePlantSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Estado de la Planta">
            <TogglePlantStatusSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Eliminar Planta">
            <SoftDeletePlantSection />
          </CollapsibleSection>
        </CollapsibleSection>

        <CollapsibleSection title="Imagenes">
          <CollapsibleSection title="Agregar imagenes a una especie">
            <CreatePlantImgSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Editar imagenes de una especie">
            <UpdatePlantImgSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Estado imagenes de una especie">
            <TogglePlantImgStatusSection />
          </CollapsibleSection>

          <div className="my-4"></div>

          <CollapsibleSection title="Eliminar imagenes de una especie">
            <SoftDeletePlantImgSection />
          </CollapsibleSection>
        </CollapsibleSection>
      </div>
      <div className="my-20"></div>
    </div>
  );
};

export default Management;
