import { usePlantUpdateForm } from './usePlantUpdateForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';

const UpdatePlantSection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    selectedPlantId,
    setSelectedPlantId,
    formData,
    setFormData,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    selectedPlant,
    handleSubmit,
    isFormValid
  } = usePlantUpdateForm();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Planta actualizada exitosamente"
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

        {selectedHerbariumId && selectedFamilyId && (
          <div>
            <SelectWithTooltip
              label="Seleccionar Planta"
              value={selectedPlantId}
              onChange={setSelectedPlantId}
              options={plants.map(plant => ({ id: plant.id, name: plant.common_name+" - "+plant.scientific_name }))}
              required
            />
          </div>
        )}

        {selectedPlantId && selectedPlant && (
           <>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Nuevo Nombre Común
             </label>
             <input
               type="text"
               value={formData.common_name}
               onChange={(e) => setFormData(prev => ({ ...prev, common_name: e.target.value }))}
               placeholder={`Actual: ${selectedPlant.common_name} - Deja en blanco para mantener el valor actual`}
               className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Nuevo Nombre Científico
             </label>
             <input
               type="text"
               value={formData.scientific_name}
               onChange={(e) => setFormData(prev => ({ ...prev, scientific_name: e.target.value }))}
               placeholder={`Actual: ${selectedPlant.scientific_name} - Deja en blanco para mantener el valor actual`}
               className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Nueva Cantidad
             </label>
             <input
               type="number"
               value={formData.quantity}
               onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
               placeholder={`Actual: ${selectedPlant.quantity} - Deja en blanco para mantener el valor actual`}
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
               placeholder={`Actual: ${selectedPlant.description || 'Sin descripción'} - Deja en blanco para mantener el valor actual`}
               className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none min-h-[100px]"
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Nuevas Referencias
             </label>
             <textarea
               value={formData.refs}
               onChange={(e) => setFormData(prev => ({ ...prev, refs: e.target.value }))}
               placeholder={`Actual: ${selectedPlant.refs || 'Sin referencias'} - Deja en blanco para mantener el valor actual`}
               className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none min-h-[100px]"
             />
           </div>

            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Actualizando...' : 'Actualizar Planta'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UpdatePlantSection;