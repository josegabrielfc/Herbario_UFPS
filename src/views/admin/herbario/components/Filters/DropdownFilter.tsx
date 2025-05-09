import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface DropdownFilterProps {
  dropdownFamilies: string[];
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

/**
 * @component DropdownFilter
 * @description Componente de menú desplegable para filtrar familias de plantas
 * Características:
 * - Menú desplegable con animaciones suaves
 * - Muestra la selección actual o "Ver Más"
 * - Efectos hover y estados activos
 * - Soporte para modo oscuro
 * - Diseño con efecto glassmorphism
 * - Transiciones animadas
 * 
 * @param {DropdownFilterProps} props - Propiedades del componente
 * @param {string[]} props.dropdownFamilies - Lista de familias disponibles
 * @param {string} props.selectedSection - Familia actualmente seleccionada
 * @param {Function} props.setSelectedSection - Función para actualizar la selección
 * 
 * @example
 * // Uso básico
 * <DropdownFilter
 *   dropdownFamilies={["Familia1", "Familia2"]}
 *   selectedSection="Familia1"
 *   setSelectedSection={(section) => handleSelection(section)}
 * />
 */
const DropdownFilter = ({ dropdownFamilies, selectedSection, setSelectedSection }: DropdownFilterProps) => {
  // Estado para el término de búsqueda de familias
  const [familySearch, setFamilySearch] = useState("");

  // Filtrar familias según la búsqueda
  const filteredFamilies = dropdownFamilies.filter(family =>
    family.toLowerCase().includes(familySearch.toLowerCase())
  );

  return (
    <Menu as="li" className="relative">
      {/* Botón del menú desplegable */}
      <Menu.Button className="flex items-center text-base font-medium text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-200">
        {dropdownFamilies.includes(selectedSection) ? selectedSection : "Ver Más"}
        <ChevronDownIcon className="ml-2 h-5 w-5" />
      </Menu.Button>

      {/* Animación de transición del menú */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* Contenedor del menú desplegable */}
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-[8px] bg-white shadow-xl focus:outline-none z-[9999] overflow-hidden">
          <div className="p-2">
            {/* Buscador de familias */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Buscar familia..."
                value={familySearch}
                onChange={(e) => setFamilySearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-4 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
              />
              <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="py-1">
              {/* Lista de opciones del menú */}
              {filteredFamilies.map((section) => (
                <Menu.Item key={section}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-green-500/10 text-green-500' : ''
                      } ${
                        selectedSection === section
                          ? "text-green-500 bg-green-500/5"
                          : "text-gray-700"
                      } block w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:text-green-500`}
                      onClick={() => setSelectedSection(section)}
                    >
                      {section}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownFilter;