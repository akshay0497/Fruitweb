import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  name: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  disabled = false,
  name,
}) => {
  return (
    <label
      className={`flex items-center space-x-3 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          disabled={disabled}
          className="sr-only"
        />
        <div className="w-5 h-5 bg-white/50 backdrop-blur-md border border-white/30 rounded-full transition-all duration-200 flex items-center justify-center">
          {checked && (
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
};
