import React, { useRef } from 'react';
import { useFormContext } from './Form';
import { Upload } from 'lucide-react';

export const FileInput = ({
  name,
  label,
  accept,
  multiple = false,
  disabled = false,
  className = "",
  containerClassName = "mb-4",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();
  const fileInputRef = useRef(null);

  const value = values[name]; // Can be FileList or single File depending on 'multiple'
  const error = touched[name] && errors[name];
  const isDisabled = disabled || isSubmitting;

  const handleFileChange = (e) => {
    const files = e.target.files;
    handleChange(name, multiple ? files : (files.length > 0 ? files[0] : null));
  };

  const displayFileName = () => {
    if (!value) return "Click to upload or drag and drop";
    if (multiple && value.length > 0) return `${value.length} files selected`;
    if (!multiple && value.name) return value.name;
    return "File selected";
  };

  return (
    <div className={containerClassName}>
      {label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
      <div 
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition ${
          error ? 'border-[#DC3545] bg-[#DC3545]/5' : 'border-stroke bg-gray hover:bg-gray-2 dark:border-[#2E3A47] dark:bg-meta-4 dark:hover:bg-meta-4/80'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={() => !isDisabled && fileInputRef.current && fileInputRef.current.click()}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-[#1A222C] shadow-sm mb-4">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm font-medium text-[#1C2434] dark:text-white mb-1">
          {displayFileName()}
        </p>
        {!value && (
          <p className="text-xs text-[#64748B] dark:text-[#8A99AF]">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        )}
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          onBlur={() => handleBlur(name)}
          disabled={isDisabled}
          className="sr-only"
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-[#DC3545]">{error}</p>}
    </div>
  );
};
