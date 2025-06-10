import { useState } from "react";
import { PlantType } from "../../../types";
import ImageModal from "./Modals/ImageModal";

interface PlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: PlantType;
  loadingImages?: boolean;
}

const PlantModal = ({ isOpen, onClose, plant, loadingImages = false }: PlantModalProps) => {
  const [selectedImage, setSelectedImage] = useState<{url: string; description?: string} | null>(null);
  
  if (!isOpen || !plant) return null;

  const images = plant.images || [plant.image];

  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/25 backdrop-blur-sm"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-full items-center justify-center p-8 text-center">
          {/* Container Principal */}
          <div className="relative transform overflow-hidden rounded-xl bg-white/80 backdrop-blur-md px-8 pb-8 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-8 min-h-[80vh] flex flex-col"> 
            {/* Botón de cerrar */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 hover:bg-gray-100 cursor-pointer z-10"
            >
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Container Título e Imágenes (50% altura) */}
            <div className="flex-1 min-h-[50%] flex flex-col">
              <h3 className="text-2xl font-bold leading-6 text-gray-900 mb-6">
                {plant.commonName}
              </h3>

              {loadingImages ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-500"></div>
                </div>
              ) : (
                <div className={`flex-grow grid gap-4 ${
                  images.length === 1 ? 'grid-cols-1' : 
                  images.length === 2 ? 'grid-cols-2' :
                  'grid-cols-3'
                } place-items-center`}>
                  {images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative cursor-pointer ${
                        images.length === 1 ? 'col-span-1 w-1/2 mx-auto' :
                        images.length === 2 ? 'col-span-1' :
                        'col-span-1'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={`${plant.commonName} - Vista ${index + 1}`}
                        className="w-full h-64 object-cover rounded-2xl hover:opacity-90 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Container Información (50% altura) */}
            <div className="flex-1 min-h-[50%] flex flex-col">
              {/* Container Información Principal */}
              <div className="space-y-4 flex-grow">
                <p className="text-base text-gray-500">
                  <span className="font-bold">Nombre científico:</span>{" "}
                  {plant.scientificName.split(/(?<=\S*\s+\S+)\s+/).map((part, index) => (
                    index === 0 ? (
                      <span key={`name-${index}`} className="italic font-bold">{part}</span>
                    ) : (
                      <span key={`author-${index}`} className="font-normal">{` ${part}`}</span>
                    )
                  ))}
                </p>
                <p className="text-base text-gray-500">
                  <span className="font-bold">Tipo de Coleccion:</span> {plant.herbarium_name}
                </p>
                <p className="text-base text-gray-500">
                  <span className="font-bold">Familia:</span> {plant.section}
                </p>
                <p className="text-base text-gray-500">
                  <span className="font-bold">Accesiones:</span> {plant.quantity}
                </p>
                <p className="text-base text-gray-500">
                  <span className="font-bold">Descripcion:</span> {plant.description}
                </p>
              </div>

              {/* Container Referencias */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-base text-gray-500">
                  <span className="font-bold">Referencias:</span> {plant.refs ?? "Sin referencias"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ''}
        description={selectedImage?.description}
        alt={`${plant.commonName} - Imagen ampliada`}
      />
    </>
  );
};

export default PlantModal;