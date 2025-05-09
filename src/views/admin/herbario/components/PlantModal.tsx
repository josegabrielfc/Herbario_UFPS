import { Plant } from '../variables/types';

interface PlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: Plant;
}

const PlantModal = ({ isOpen, onClose, plant }: PlantModalProps) => {
  if (!isOpen || !plant) return null;

  const images = [plant.image, plant.image, plant.image];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/25 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-8 text-center"> {/* Increased padding */}
        <div className="relative transform overflow-hidden rounded-xl bg-white/80 backdrop-blur-md px-8 pb-8 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-8 min-h-[80vh]"> 
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
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

          {/* Content */}
          <div className="mt-6 text-center sm:mt-1.5 sm:text-left"> {/* Increased top margin */}
            <h3 className="text-2xl font-bold leading-6 text-gray-900 mb-6"> 
              {plant.commonName}
            </h3>

            {/* Updated dynamic image grid with more height */}
            <div className={`mt-6 grid gap-4 ${
              images.length === 1 ? 'grid-cols-1' : 
              images.length === 2 ? 'grid-cols-2' :
              'grid-cols-3'
            } place-items-center`}> {/* Increased gap and margin */}
              {images.map((image, index) => (
                <div key={index} className={`relative ${
                  images.length === 1 ? 'col-span-1 w-1/2 mx-auto' :
                  images.length === 2 ? 'col-span-1' :
                  'col-span-1'
                }`}>
                  <img
                  src={image}
                  alt={`${plant.commonName} - Vista ${index + 1}`}
                  className="w-full h-80 object-cover rounded-2xl" //hover:scale-105 transition-transform duration-300
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4"> {/* Increased margin and spacing */}
                <p className="text-base text-gray-500">
                <span className="font-bold">Nombre científico:</span>{" "}
                <span className="italic font-thin">{plant.scientificName}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantModal;