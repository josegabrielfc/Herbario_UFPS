import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import DropdownFilter from "./DropdownFilter";
import { getHerbariumTypes, getFamiliesByHerbariumId } from "../../../../../services/herbarium.service";

interface FiltersSectionProps {
  selectedHerbariumType: string;
  onHerbariumTypeChange: (id: number, name: string) => void;
  mainFamilies: string[];
  dropdownFamilies: string[];
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const FiltersSection = ({
  selectedHerbariumType,
  onHerbariumTypeChange,
  mainFamilies,
  dropdownFamilies,
  selectedSection,
  setSelectedSection
}: FiltersSectionProps) => {
  const [herbariumSearch, setHerbariumSearch] = useState("");
  const [herbariumTypes, setHerbariumTypes] = useState<Array<{ id: number; name: string }>>([]);

  // Cargar tipos de herbario al montar el componente
  useEffect(() => {
    const loadHerbariumTypes = async () => {
      const types = await getHerbariumTypes();
      setHerbariumTypes(types.map(type => ({ id: type.id, name: type.name })));
    };
    loadHerbariumTypes();
  }, []);

  // Filtrar tipos de herbario según la búsqueda
  const filteredHerbariumTypes = herbariumTypes.filter(type =>
    type.name.toLowerCase().includes(herbariumSearch.toLowerCase())
  );

  return (
    <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
      {/* Selector de tipo de herbario */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <h4 className="ml-1 text-2xl font-bold text-navy-700">
          Tipo de Herbario
        </h4>
        
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center text-base font-medium text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-200">
            {selectedHerbariumType || "Seleccione un tipo"}
            <ChevronDownIcon className="ml-2 h-5 w-5" />
          </Menu.Button>

          <Menu.Items className="absolute left-0 mt-2 w-54 origin-top-right rounded-[8px] bg-white shadow-xl focus:outline-none z-[9999] overflow-hidden">
            <div className="p-2">
              {/* Buscador */}
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Buscar tipo..."
                  value={herbariumSearch}
                  onChange={(e) => setHerbariumSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-4 text-sm text-gray-700 focus:border-green-500 focus:outline-none"
                />
                <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              <div className="py-1">
                {filteredHerbariumTypes.map((type) => (
                  <Menu.Item key={type.id}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-green-500/10 text-green-500' : ''
                        } ${
                          selectedHerbariumType === type.name
                            ? "text-green-500 bg-green-500/5"
                            : "text-gray-700"
                        } block w-full px-4 py-3 text-left text-sm transition-colors duration-200 hover:text-green-500`}
                        onClick={() => onHerbariumTypeChange(type.id, type.name)}
                      >
                        {type.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
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
              } hover:text-brand-500`}
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