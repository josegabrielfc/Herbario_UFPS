import { useState } from 'react';
import { createFamily } from '../../../../../../services/herbarium.service';
import { useHerbariumStore } from '../../../stores/herbariumStore';

const CreateFamilySection = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    herbarium_type_id: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Usar el store en lugar de estados locales
  const herbariums = useHerbariumStore(state => state.herbariums);
  const loading = useHerbariumStore(state => state.loading);
  const fetchHerbariums = useHerbariumStore(state => state.fetchHerbariums);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createFamily({
        ...formData,
        herbarium_type_id: parseInt(formData.herbarium_type_id)
      });
      setSuccess(true);
      setFormData({ name: '', description: '', herbarium_type_id: '' });
      // Actualizar la lista de herbarios después de crear
      await fetchHerbariums();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la familia');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Crear Nueva Familia</h2> */}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
          Familia creada exitosamente
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Herbario
          </label>
          <select
            value={formData.herbarium_type_id}
            onChange={(e) => setFormData(prev => ({ ...prev, herbarium_type_id: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
            required
          >
            <option value="">Seleccione un herbario</option>
            {herbariums.map((herb) => (
              <option key={herb.id} value={herb.id}>
                {herb.name}
              </option>
            ))}
          </select>
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