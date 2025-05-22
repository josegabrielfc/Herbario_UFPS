import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import DropdownFilter from "./DropdownFilter";
import { Services } from "../../../../../services/services";

interface FiltersSectionProps {
  selectedHerbariumType: string;
  onHerbariumTypeChange: (id: number, name: string) => void;
  mainFamilies: Array<{ id: number; name: string }>;  // Updated type
  dropdownFamilies: Array<{ id: number; name: string }>; // Updated type
  selectedSection: string;
  setSelectedSection: (familyId: number, familyName: string) => void; // Updated type
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
      const types = await Services.herbariums.getAll();
      setHerbariumTypes(types.map(type => ({ id: type.id, name: type.name })));
    };
    loadHerbariumTypes();
  }, []);

  // Add "All herbaria" option to the list
  const allHerbariumTypes = [
    { id: 0, name: "Todas las colecciones" },
    ...herbariumTypes
  ];

  // Filtrar tipos de herbario según la búsqueda
  const filteredHerbariumTypes = allHerbariumTypes.filter(type =>
    type.name.toLowerCase().includes(herbariumSearch.toLowerCase())
  );

  return (
    <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
      {/* Selector de tipo de herbario */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <h4 className="ml-1 text-2xl font-bold text-navy-700">
          Tipo de Colección
        </h4>
        
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center text-base font-medium text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-200">
            {selectedHerbariumType || "Seleccione un tipo"}
            <ChevronDownIcon className="ml-2 h-5 w-5" />
          </Menu.Button>

          <Menu.Items className="absolute left-0 mt-2 w-54 origin-top-right rounded-[8px] bg-white shadow-xl focus:outline-none z-[9999] overflow-hidden max-h-[420px] flex flex-col">
            <div className="p-2 flex-shrink-0">
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
            </div>

            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent hover:scrollbar-thumb-gray-300">
              <div className="p-2">
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
                        onClick={() => {
                          if (type.id === 0) {
                            onHerbariumTypeChange(0, "Todas las colecciones");
                          } else {
                            onHerbariumTypeChange(type.id, type.name);
                          }
                        }}
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
        {mainFamilies.map((family) => (
          <li key={family.id}>
            <button
              className={`text-base font-medium cursor-pointer ${
                selectedSection === family.name
                  ? "text-brand-500"
                  : "text-gray-600"
              } hover:text-brand-500`}
              onClick={() => setSelectedSection(family.id, family.name)}
            >
              {family.name}
            </button>
          </li>
        ))}

        {/* Menú desplegable para familias adicionales */}
        {dropdownFamilies.length > 0 && (
          <DropdownFilter
            dropdownFamilies={dropdownFamilies}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        )}
      </ul>
    </div>
  );
};

export default FiltersSection;