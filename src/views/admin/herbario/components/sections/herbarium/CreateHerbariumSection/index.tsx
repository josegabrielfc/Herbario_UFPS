import { useHerbariumForm } from './useHerbariumForm';
import { UIMessages } from '../../../common/UIMessages';

const CreateHerbariumSection = () => {
  const {
    formData,
    setFormData,
    loading,
    error,
    success,
    handleSubmit
  } = useHerbariumForm();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Herbario creado exitosamente"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Herbario
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
          {loading ? 'Creando...' : 'Crear Herbario'}
        </button>
      </form>
    </div>
  );
};

export default CreateHerbariumSection;