import { useHerbariumStatusForm } from './useHerbariumStatusForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const ToggleHerbariumStatusSection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    herbariums,
    loading,
    error,
    success,
    handleStatusToggle
  } = useHerbariumStatusForm();

  const selectedHerbarium = herbariums.find(h => h.id.toString() === selectedHerbariumId);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Estado del herbario actualizado exitosamente"
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
            id="herbarium-status"
            label="Estado del Herbario"
            desc="Habilitar o deshabilitar el herbario"
            checked={selectedHerbarium.status}
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

export default ToggleHerbariumStatusSection;