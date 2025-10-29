import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
}) => {
  return (
    <div className="w-full">
      <label
        className={`flex items-center space-x-3 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 bg-white/50 backdrop-blur-md border ${
              error ? 'border-red-400' : 'border-white/30'
            } rounded transition-all duration-200 flex items-center justify-center ${
              checked ? 'bg-green-500 border-green-500' : ''
            }`}
          >
            {checked && <Check size={16} className="text-white" />}
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600 ml-8">{error}</p>}
    </div>
  );
};
