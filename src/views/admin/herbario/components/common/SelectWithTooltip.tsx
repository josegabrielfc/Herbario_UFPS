import { useState } from 'react';
import { SelectWithTooltipProps } from '../../types/ui';

export const SelectWithTooltip = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  tooltipText = '',
  required = false,
  showTooltipCondition = false
}: SelectWithTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="relative"
        onMouseEnter={() => showTooltipCondition && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => showTooltipCondition && setShowTooltip(true)}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:border-green-500 focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
          disabled={disabled}
          required={required}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        {showTooltip && showTooltipCondition && (
          <div className="absolute left-0 -bottom-8 w-full">
            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 text-center">
              {tooltipText}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};