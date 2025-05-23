import { useHerbariumDeleteForm } from './useHerbariumDeleteForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const SoftDeleteHerbariumSection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    herbariums,
    loading,
    error,
    success,
    handleDeleteToggle
  } = useHerbariumDeleteForm();

  const selectedHerbarium = herbariums.find(h => h.id.toString() === selectedHerbariumId);

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

        {selectedHerbarium && (
          <SwitchField
            id="herbarium-delete"
            label="Eliminar Herbario"
            desc="Marcar herbario como eliminado"
            checked={selectedHerbarium.is_deleted}
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

export default SoftDeleteHerbariumSection;