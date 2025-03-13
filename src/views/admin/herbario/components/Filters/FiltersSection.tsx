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
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Tipo de Herbario
        </h4>
        <select 
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-800 text-gray-700 dark:text-white"
          value={selectedHerbariumType}
          onChange={(e) => onHerbariumTypeChange(e.target.value)}
        >
          {herbariumTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
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