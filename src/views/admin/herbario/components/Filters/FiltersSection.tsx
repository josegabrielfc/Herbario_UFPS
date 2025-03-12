import DropdownFilter from "./DropdownFilter";

interface FiltersSectionProps {
  mainFamilies: string[];
  dropdownFamilies: string[];
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

/**
 * @component FiltersSection
 * @description Componente que maneja la sección de filtros para las familias de plantas
 * Características:
 * - Muestra familias principales como botones
 * - Incluye menú desplegable para familias adicionales
 * - Resalta la sección seleccionada
 * - Diseño responsivo (móvil/desktop)
 * - Soporte para modo oscuro
 * - Efectos hover en los botones
 * 
 * @param {FiltersSectionProps} props - Propiedades del componente
 * @param {string[]} props.mainFamilies - Lista de familias principales
 * @param {string[]} props.dropdownFamilies - Lista de familias en el menú desplegable
 * @param {string} props.selectedSection - Familia actualmente seleccionada
 * @param {Function} props.setSelectedSection - Función para actualizar la selección
 * 
 * @example
 * // Uso básico
 * <FiltersSection
 *   mainFamilies={["Familia1", "Familia2"]}
 *   dropdownFamilies={["Familia3", "Familia4"]}
 *   selectedSection="Familia1"
 *   setSelectedSection={(section) => handleSelection(section)}
 * />
 */
const FiltersSection = ({ 
  mainFamilies, 
  dropdownFamilies, 
  selectedSection, 
  setSelectedSection 
}: FiltersSectionProps) => {
  return (
    <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
      {/* Título de la sección */}
      <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
        Tipo de Herbario
      </h4>

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
        <DropdownFilter
          dropdownFamilies={dropdownFamilies}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
      </ul>
    </div>
  );
};

export default FiltersSection;