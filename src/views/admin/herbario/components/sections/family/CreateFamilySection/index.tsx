import { useFamilyForm } from './useFamilyForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';

const CreateFamilySection = () => {
  const {
    formData,
    setFormData,
    herbariums,
    loading,
    error,
    success,
    handleSubmit
  } = useFamilyForm();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Familia creada exitosamente"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <SelectWithTooltip
            label="Seleccionar Herbario"
            value={formData.herbarium_type_id}
            onChange={(value) => setFormData(prev => ({ ...prev, herbarium_type_id: value }))}
            options={herbariums}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Familia
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none min-h-[100px]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creando...' : 'Crear Familia'}
        </button>
      </form>
    </div>
  );
};

export default CreateFamilySection;