import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DropdownFilter from "./DropdownFilter";

interface FiltersSectionProps {
  herbariumTypes: string[];              // Lista de tipos de herbario
  selectedHerbariumType: string;         // Tipo de herbario seleccionado
  onHerbariumTypeChange: (type: string) => void;  // Manejador de cambio de tipo
  mainFamilies: string[];               // Familias principales por tipo
  dropdownFamilies: string[];           // Familias desplegables por tipo
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

/**
 * @component FiltersSection
 * @description Componente que maneja la sección de filtros para las familias de plantas
 * Características:
 * - Selector de tipo de herbario
 * - Filtros dinámicos según el tipo seleccionado
 * - Muestra familias principales como botones
 * - Incluye menú desplegable para familias adicionales
 * - Diseño responsivo (móvil/desktop)
 */
const FiltersSection = ({ 
  herbariumTypes,
  selectedHerbariumType,
  onHerbariumTypeChange,
  mainFamilies,
  dropdownFamilies,
  selectedSection,
  setSelectedSection 
}: FiltersSectionProps) => {
  return (
    <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
      {/* Selector de tipo de herbario */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Tipo de Herbario
        </h4>
        
        {/* Menú desplegable de tipos de herbario */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center text-base font-medium text-gray-700 hover:text-green-500 dark:text-white cursor-pointer transition-colors duration-200">
        {selectedHerbariumType}
        <ChevronDownIcon className="ml-2 h-5 w-5" />
          </Menu.Button>

        <Menu.Items className="absolute left-0 mt-2 w-54 origin-top-right rounded-[8px] bg-white shadow-xl focus:outline-none dark:bg-navy-800 z-[9999] overflow-hidden">
        <div className="py-1">
          {herbariumTypes.map((type) => (
            <Menu.Item key={type}>
          {({ active }) => (
            <button
              className={`${
            active ? 'bg-green-500/10 text-green-500' : ''
              } ${
            selectedHerbariumType === type
              ? "text-green-500 bg-green-500/5"
              : "text-gray-700 dark:text-white"
              } block w-full px-4 py-3 text-left text-sm transition-colors duration-200 hover:text-green-500`}
              onClick={() => onHerbariumTypeChange(type)}
            >
              {type}
            </button>
          )}
            </Menu.Item>
          ))}
        </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* Lista de filtros */}
      <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
        {/* Botones de familias principales */}
        {mainFamilies.map((section) => (
          <li key={section}>
            <button
              className={`text-base font-medium cursor-pointer ${
                selectedSection === section
                  ? "text-brand-500"
                  : "text-gray-600"
              } hover:text-brand-500 dark:text-white`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          </li>
        ))}

        {/* Menú desplegable para familias adicionales */}
        {dropdownFamilies.length > 0 && (
        <DropdownFilter
          dropdownFamilies={dropdownFamilies}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />)}
      </ul>
    </div>
  );
};

export default FiltersSection;