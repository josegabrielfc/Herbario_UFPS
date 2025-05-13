import { Fragment, useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface DropdownFilterProps {
  dropdownFamilies: Array<{ id: number; name: string }>;
  selectedSection: string;
  setSelectedSection: (familyId: number, familyName: string) => void;
}

/**
 * @component DropdownFilter
 * @description Componente de menú desplegable para filtrar familias de plantas
 * Características:
 * - Menú desplegable con animaciones suaves
 * - Muestra la selección actual o "Más"
 * - Efectos hover y estados activos
 * - Soporte para modo oscuro
 * - Diseño con efecto glassmorphism
 * - Transiciones animadas
 * - Incluye un buscador para filtrar familias
 * 
 * @param {DropdownFilterProps} props - Propiedades del componente
 * @param {Array<{ id: number; name: string }>} props.dropdownFamilies - Lista de familias disponibles
 * @param {string} props.selectedSection - Familia actualmente seleccionada
 * @param {Function} props.setSelectedSection - Función para actualizar la selección
 * 
 * @example
 * // Uso básico
 * <DropdownFilter
 *   dropdownFamilies={[{ id: 1, name: "Familia1" }, { id: 2, name: "Familia2" }]}
 *   selectedSection="Familia1"
 *   setSelectedSection={(id, name) => handleSelection(id, name)}
 * />
 */
const DropdownFilter = ({
  dropdownFamilies,
  selectedSection,
  setSelectedSection
}: DropdownFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFamilies = dropdownFamilies.filter(family =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center text-base font-medium text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-200">
        {dropdownFamilies.some(family => family.name === selectedSection) 
          ? selectedSection 
          : "Ver Más"}
        <ChevronDownIcon className="ml-2 h-5 w-5" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-54 origin-top-right rounded-[8px] bg-white shadow-xl focus:outline-none z-[9999] overflow-hidden max-h-[420px] flex flex-col">
        <div className="p-2 flex-shrink-0">
          {/* Buscador */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Buscar familia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-4 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
          <div className="p-2">
            {filteredFamilies.map((family) => (
              <Menu.Item key={family.id}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-500/10 text-green-500' : ''
                    } ${
                      selectedSection === family.name
                        ? "text-green-500 bg-green-500/5"
                        : "text-gray-700"
                    } block w-full px-4 py-3 text-left text-sm transition-colors duration-200 hover:text-green-500`}
                    onClick={() => setSelectedSection(family.id, family.name)}
                  >
                    {family.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropdownFilter;