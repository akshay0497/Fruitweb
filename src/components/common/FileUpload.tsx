import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  onChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  preview?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  accept = 'image/jpeg,image/png',
  maxSize = 2097152,
  preview,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
  const [fileError, setFileError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (!file) {
      onChange(null);
      setPreviewUrl(null);
      return;
    }

    if (maxSize && file.size > maxSize) {
      setFileError(`File size must be less than ${(maxSize / 1048576).toFixed(1)}MB`);
      onChange(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    onChange(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange(null);
    setFileError('');
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {!previewUrl ? (
        <label
          className={`flex flex-col items-center justify-center w-full h-40 bg-white/20 backdrop-blur-md border-2 border-dashed ${
            error || fileError ? 'border-red-400' : 'border-white/30'
          } rounded-lg cursor-pointer hover:bg-white/30 transition-all duration-200 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-600" />
            <p className="mb-2 text-sm text-gray-700">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-600">
              {accept.includes('image') ? 'PNG, JPG (MAX. 2MB)' : 'Supported files only'}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            required={required}
            disabled={disabled}
          />
        </label>
      ) : (
        <div className="relative w-full h-40 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            disabled={disabled}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {(error || fileError) && (
        <p className="mt-1 text-sm text-red-600">{error || fileError}</p>
      )}
      {helperText && !error && !fileError && (
        <p className="mt-1 text-sm text-gray-600">{helperText}</p>
      )}
    </div>
  );
};
