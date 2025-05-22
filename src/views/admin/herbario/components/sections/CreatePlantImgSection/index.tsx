import { useImageUploadForm } from './useImageUploadForm';
import { UIMessages } from '../../common/UIMessages';
import { SelectWithTooltip } from '../../common/SelectWithTooltip';

const CreatePlantImgSection = () => {
  const {
    selectedIds,
    setSelectedIds,
    families,
    plants,
    images,
    setImages,
    herbariums,
    loading,
    error,
    success,
    handleSubmit
  } = useImageUploadForm();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <UIMessages 
        error={error}
        success={success}
        successMessage="Imágenes subidas exitosamente"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <SelectWithTooltip
              label="Seleccionar Herbario"
              value={selectedIds.herbariumId}
              onChange={(value) => {
                setSelectedIds(prev => ({
                  ...prev,
                  herbariumId: value,
                  familyId: '',
                  plantId: ''
                }));
              }}
              options={herbariums}
              required
            />
          </div>

          <div>
            <SelectWithTooltip
              label="Seleccionar Familia"
              value={selectedIds.familyId}
              onChange={(value) => {
                setSelectedIds(prev => ({
                  ...prev,
                  familyId: value,
                  plantId: ''
                }));
              }}
              options={families}
              disabled={!selectedIds.herbariumId}
              tooltipText="Debes seleccionar un herbario primero"
              showTooltipCondition={!selectedIds.herbariumId}
              required
            />
          </div>

          <div>
            <SelectWithTooltip
              label="Seleccionar Planta"
              value={selectedIds.plantId}
              onChange={(value) => setSelectedIds(prev => ({
                ...prev,
                plantId: value
              }))}
              options={plants.map(plant => ({
                id: plant.id,
                name: `${plant.common_name} (${plant.scientific_name})`
              }))}
              disabled={!selectedIds.familyId}
              tooltipText="Debes seleccionar una familia primero"
              showTooltipCondition={!selectedIds.familyId && !selectedIds.herbariumId}
              required
            />
          </div>
        </div>

        {/* Sección de imágenes */}
        {selectedIds.plantId && (
          <div className="space-y-4">
            {images.map((img, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">Imagen {index + 1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index] = {
                          ...newImages[index],
                          file: e.target.files?.[0] || null
                        };
                        setImages(newImages);
                      }}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Descripción (opcional)"
                      value={img.description}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index] = {
                          ...newImages[index],
                          description: e.target.value
                        };
                        setImages(newImages);
                      }}
                      className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>

                {img.file && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(img.file)} 
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {loading ? 'Subiendo...' : 'Subir Imágenes'}
        </button>
      </form>
    </div>
  );
};

export default CreatePlantImgSection;