import { useFamilyStatusForm } from './useFamilyStatusForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const ToggleFamilyStatusSection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    herbariums,
    families,
    loading,
    error,
    success,
    handleStatusToggle
  } = useFamilyStatusForm();

  const selectedFamily = families.find(f => f.id.toString() === selectedFamilyId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Estado de la familia actualizado exitosamente"
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

        {selectedFamily && (
          <SwitchField
            id="family-status"
            label="Estado de la Familia"
            desc="Habilitar o deshabilitar la familia"
            checked={selectedFamily.status}
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

export default ToggleFamilyStatusSection;