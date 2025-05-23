import { usePlantDeleteForm } from './usePlantDeleteForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const SoftDeletePlantSection = () => {
  const {
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
    handleDeleteToggle
  } = usePlantDeleteForm();

  const selectedPlant = plants.find(p => p.id.toString() === selectedPlantId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Estado de eliminación actualizado exitosamente"
      />

      <div className="space-y-4">
        <SelectWithTooltip
          label="Seleccionar Herbario"
          value={selectedHerbariumId}
          onChange={setSelectedHerbariumId}
          options={herbariums}
          required
        />

        {selectedHerbariumId && (
          <SelectWithTooltip
            label="Seleccionar Familia"
            value={selectedFamilyId}
            onChange={setSelectedFamilyId}
            options={families}
            required
          />
        )}

        {selectedHerbariumId && selectedFamilyId && (
          <SelectWithTooltip
            label="Seleccionar Planta"
            value={selectedPlantId}
            onChange={setSelectedPlantId}
            options={plants.map(plant => ({
              id: plant.id,
              name: `${plant.common_name} - ${plant.scientific_name}`
            }))}
            required
          />
        )}

        {selectedPlant && (
          <SwitchField
            id="plant-delete"
            label="Eliminar Planta"
            desc="Marcar planta como eliminada"
            checked={selectedPlant.is_deleted}
            onChange={handleDeleteToggle}
            disabled={loading}
            mt="mt-4"
            mb="mb-4"
          />
        )}
      </div>
    </div>
  );
};

export default SoftDeletePlantSection;