import { useState } from 'react';
import { Services } from '../../../../../services/services';

interface CreateHerbariumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateHerbariumModal = ({ isOpen, onClose, onSuccess }: CreateHerbariumModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      await Services.herbariums.create(formData);
      onSuccess();
      onClose();
      setFormData({ name: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el tipo de herbario');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/25 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-xl bg-white/80 backdrop-blur-md px-6 pb-6 pt-5 text-left shadow-xl transition-all w-full max-w-lg">
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Crear Nuevo Tipo de Herbario
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
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

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHerbariumModal;