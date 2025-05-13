import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: {
    section: string;
    commonName: string;
    scientificName: string;
    quantity: string;
    image: string;
  } | null;
}

const PlantModalX = ({ isOpen, onClose, plant }: PlantModalProps) => {
  if (!plant) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex items-center justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {plant.commonName}
                  </h3>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </Dialog.Title>

                <div className="mt-4">
                  <img
                    src={plant.image}
                    alt={plant.commonName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Nombre científico:</span> {plant.scientificName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Familia:</span> {plant.section}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Cantidad:</span> {plant.quantity}
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlantModalX;