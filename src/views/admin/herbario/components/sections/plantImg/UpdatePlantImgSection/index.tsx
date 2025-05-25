import { usePlantImageUpdateForm } from './usePlantImageUpdateForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';

const UpdatePlantImageSection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    selectedPlantId,
    setSelectedPlantId,
    selectedImageId,
    formData,
    setFormData,
    plantImages,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    handleImageSelection,
    handleSubmit
  } = usePlantImageUpdateForm();

  const BASE_URL =  import.meta.env.VITE_API_URL || 'http://localhost:3000';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Imagen actualizada exitosamente"
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
              options={plants.map(plant => ({ 
                id: plant.id, 
                name: plant.common_name + " - " + plant.scientific_name 
              }))}
              required
            />
          </div>
        )}
        {selectedPlantId && plantImages.length === 0 && (
          <div className="mt-6">
            <UIMessages 
              error="No hay imágenes para esta planta"
              success={false}
              successMessage=""
            />
          </div>
        )}
        
        {selectedPlantId && plantImages.length > 0 && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Seleccionar Imagen a Actualizar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {plantImages.map((image) => (
                  <div 
                    key={image.id}
                    onClick={() => handleImageSelection(image.id)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageId === image.id 
                        ? 'border-green-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={`${BASE_URL}${image.image_url}`}
                      alt="Plant"
                      className="w-full h-48 object-cover"
                    />
                    {image.description && (
                      <div className="p-2 bg-white/90 absolute bottom-0 left-0 right-0">
                        <p className="text-sm text-gray-700 truncate">
                          {image.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedImageId && (
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva Imagen
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      image: e.target.files?.[0] || null
                    }))}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
                  />
                </div>

                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(formData.image)} 
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva Descripción
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    placeholder={`Actual: ${formData.description} - Ingresa una nueva descripción para la imagen`}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || (!formData.image)}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Actualizando...' : 'Actualizar Imagen'}
                </button>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default UpdatePlantImageSection;