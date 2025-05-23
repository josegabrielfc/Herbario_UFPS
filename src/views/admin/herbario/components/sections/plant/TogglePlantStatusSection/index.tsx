import { usePlantStatusForm } from './usePlantStatusForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const TogglePlantStatusSection = () => {
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
    handleStatusToggle
  } = usePlantStatusForm();

  const selectedPlant = plants.find(p => p.id.toString() === selectedPlantId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Estado de la planta actualizado exitosamente"
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
            id="plant-status"
            label="Estado de la Planta"
            desc="Habilitar o deshabilitar la planta"
            checked={selectedPlant.status}
            onChange={handleStatusToggle}
            disabled={loading}
            mt="mt-4"
            mb="mb-4"
          />
        )}
      </div>
    </div>
  );
};

export default TogglePlantStatusSection;