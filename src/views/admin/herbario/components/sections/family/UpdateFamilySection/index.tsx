import { useFamilyUpdateForm } from './useFamilyUpdateForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';

const UpdateFamilySection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    formData,
    setFormData,
    herbariums,
    families,
    loading,
    error,
    success,
    handleSubmit,
    isFormValid
  } = useFamilyUpdateForm();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Familia actualizada exitosamente"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <SelectWithTooltip
            label="Seleccionar Herbario"
            value={selectedHerbariumId}
            onChange={setSelectedHerbariumId}
            options={herbariums}
            required
          />
        </div>

        {selectedHerbariumId && (
          <div>
            <SelectWithTooltip
              label="Seleccionar Familia"
              value={selectedFamilyId}
              onChange={setSelectedFamilyId}
              options={families}
              required
            />
          </div>
        )}

        {selectedFamilyId && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevo Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Deja en blanco para mantener el nombre actual"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deja en blanco para mantener la descripción actual"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Actualizando...' : 'Actualizar Familia'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdateFamilySection;