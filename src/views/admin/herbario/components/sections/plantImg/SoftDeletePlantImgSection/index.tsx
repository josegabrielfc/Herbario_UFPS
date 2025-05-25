import { usePlantImgDeleteForm } from './usePlantImgDeleteForm';
import { UIMessages } from '../../../common/UIMessages';
import { SelectWithTooltip } from '../../../common/SelectWithTooltip';
import SwitchField from '../../../../../../../components/fields/SwitchField';

const TogglePlantImgStatusSection = () => {
  const {
    selectedHerbariumId,
    setSelectedHerbariumId,
    selectedFamilyId,
    setSelectedFamilyId,
    selectedPlantId,
    setSelectedPlantId,
    selectedImageId,
    setSelectedImageId,
    plantImages,
    herbariums,
    families,
    plants,
    loading,
    error,
    success,
    handleDeleteToggle
  } = usePlantImgDeleteForm();

  const selectedImage = plantImages.find(img => img.id === selectedImageId);
  const BASE_URL =  import.meta.env.VITE_API_URL || 'http://localhost:3000';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Estado de la imagen actualizado exitosamente"
      />

      <div className="space-y-4">
        <SelectWithTooltip
          label="Seleccionar Herbario"
          value={selectedHerbariumId}
          onChange={setSelectedHerbariumId}
          options={herbariums}
          required
        />

        {selectedHerbariumId && (
          <SelectWithTooltip
            label="Seleccionar Familia"
            value={selectedFamilyId}
            onChange={setSelectedFamilyId}
            options={families}
            required
          />
        )}

        {selectedHerbariumId && selectedFamilyId && (
          <SelectWithTooltip
            label="Seleccionar Planta"
            value={selectedPlantId}
            onChange={setSelectedPlantId}
            options={plants.map(plant => ({
              id: plant.id,
              name: `${plant.common_name} - ${plant.scientific_name}`
            }))}
            required
          />
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
                Seleccionar Imagen
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {plantImages.map((image) => (
                  <div 
                    key={image.id}
                    onClick={() => setSelectedImageId(image.id)}
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

            {selectedImage && (
                <SwitchField
                    id="image-delete"
                    label="Eliminar Imagen"
                    desc="Marcar imagen como eliminada"
                    checked={selectedImage.is_deleted}
                    onChange={handleDeleteToggle}
                    disabled={loading}
                    mt="mt-4"
                    mb="mb-4"
                />
                )}
          </>
        )}
      </div>
    </div>
  );
};

export default TogglePlantImgStatusSection;