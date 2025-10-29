import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  min,
  max,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full bg-white/50 backdrop-blur-md border ${
            error ? 'border-red-400' : 'border-white/30'
          } rounded-lg p-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
        <Calendar
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
          size={20}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-600">{helperText}</p>
      )}
    </div>
  );
};
