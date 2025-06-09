interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  description?: string;
  alt: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, description, alt }: ImageModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/75 backdrop-blur-sm"
      aria-labelledby="image-modal"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative max-w-[90vw] max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -right-4 -top-4 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 cursor-pointer z-10"
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

          <img
            src={imageUrl}
            alt={alt}
            className="rounded-lg object-contain max-h-[80vh] mx-auto"
          />
          
          {description && (
            <div className="mt-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-base text-gray-700">Descripcion: {description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;