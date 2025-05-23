import { usePlantForm } from './usePlantForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';

const CreatePlantSection = () => {
  const {
    formData,
    setFormData,
    selectedHerbariumId,
    setSelectedHerbariumId,
    families,
    herbariums,
    loading,
    error,
    success,
    handleSubmit
  } = usePlantForm();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Planta creada exitosamente"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SelectWithTooltip
              label="Seleccionar Herbario"
              value={selectedHerbariumId}
              onChange={(value) => {
                setSelectedHerbariumId(value);
                setFormData(prev => ({ ...prev, family_id: '' }));
              }}
              options={herbariums}
              required
            />
          </div>

          <div className="relative">
            <SelectWithTooltip
              label="Seleccionar Familia"
              value={formData.family_id}
              onChange={(value) => setFormData(prev => ({ ...prev, family_id: value }))}
              options={families}
              disabled={!selectedHerbariumId}
              tooltipText="Debes seleccionar un herbario primero"
              showTooltipCondition={!selectedHerbariumId}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre común
            </label>
            <input
              type="text"
              value={formData.common_name}
              onChange={(e) => setFormData(prev => ({ ...prev, common_name: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre científico
            </label>
            <input
              type="text"
              value={formData.scientific_name}
              onChange={(e) => setFormData(prev => ({ ...prev, scientific_name: e.target.value }))}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
            required
            min="1"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Referencias
          </label>
          <textarea
            value={formData.refs}
            onChange={(e) => setFormData(prev => ({ ...prev, refs: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creando...' : 'Crear Planta'}
        </button>
      </form>
    </div>
  );
};

export default CreatePlantSection;