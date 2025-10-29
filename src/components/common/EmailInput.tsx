import React from 'react';

interface EmailInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label,
  placeholder = 'Enter your email',
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full bg-white/50 backdrop-blur-md border ${
          error ? 'border-red-400' : 'border-white/30'
        } rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-600">{helperText}</p>
      )}
    </div>
  );
};
