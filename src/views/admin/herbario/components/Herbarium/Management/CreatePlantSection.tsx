import { useState, useEffect } from 'react';
import { getFamiliesByHerbariumId, createPlant } from '../../../../../../services/herbarium.service';
import { useHerbariumStore } from '../../../stores/herbariumStore';

const CreatePlantSection = () => {
  const [formData, setFormData] = useState({
    family_id: '',
    common_name: '',
    scientific_name: '',
    quantity: '',
    description: '',
    refs: ''
  });
  
  const [selectedHerbariumId, setSelectedHerbariumId] = useState('');
  const [families, setFamilies] = useState<Array<{ id: number; name: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Usar el store
  const herbariums = useHerbariumStore(state => state.herbariums);
  const loading = useHerbariumStore(state => state.loading);

  // Solo mantener el efecto para cargar familias
  useEffect(() => {
    const loadFamilies = async () => {
      if (!selectedHerbariumId) {
        setFamilies([]);
        return;
      }

      try {
        const familiesData = await getFamiliesByHerbariumId(parseInt(selectedHerbariumId));
        setFamilies(familiesData);
      } catch (err) {
        setError('Error al cargar las familias');
        setFamilies([]);
      }
    };

    loadFamilies();
  }, [selectedHerbariumId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await createPlant({
        ...formData,
        family_id: parseInt(formData.family_id),
        quantity: parseInt(formData.quantity)
      });
      setSuccess(true);
      setFormData({
        family_id: '',
        common_name: '',
        scientific_name: '',
        quantity: '',
        description: '',
        refs: ''
      });
      setSelectedHerbariumId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la planta');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Crear Nueva Planta</h2> */}
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
          Planta creada exitosamente
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Herbario
            </label>
            <select
              value={selectedHerbariumId}
              onChange={(e) => {
                setSelectedHerbariumId(e.target.value);
                setFormData(prev => ({ ...prev, family_id: '' }));
              }}
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

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar Familia
            </label>
            <div 
              className="relative"
              onMouseEnter={() => !selectedHerbariumId && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => !selectedHerbariumId && setShowTooltip(true)}
            >
              <select
                value={formData.family_id}
                onChange={(e) => setFormData(prev => ({ ...prev, family_id: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                required
                disabled={!selectedHerbariumId}
              >
                <option value="">Seleccione una familia</option>
                {families.map((family) => (
                  <option key={family.id} value={family.id}>
                    {family.name}
                  </option>
                ))}
              </select>

              {/* Tooltip */}
              {showTooltip && !selectedHerbariumId && (
                <div className="absolute left-0 -bottom-8 w-full">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 text-center">
                    Debes seleccionar un herbario primero
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
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