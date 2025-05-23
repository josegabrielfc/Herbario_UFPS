import { useFamilyDeleteForm } from './useFamilyDeleteForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const SoftDeleteFamilySection = () => {
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
    handleDeleteToggle
  } = useFamilyDeleteForm();

  const selectedFamily = families.find(f => f.id.toString() === selectedFamilyId);

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

        {selectedFamily && (
          <SwitchField
            id="family-delete"
            label="Eliminar Familia"
            desc="Marcar familia como eliminada"
            checked={selectedFamily.is_deleted}
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

export default SoftDeleteFamilySection;