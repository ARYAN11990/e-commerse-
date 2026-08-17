import React from 'react';
import { useFormContext } from './Form';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  name,
  label,
  options = [],
  placeholder = 'Select an option',
  multiple = false,
  disabled = false,
  className = "",
  containerClassName = "mb-4",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();

  const value = values[name] !== undefined ? values[name] : (multiple ? [] : '');
  const error = touched[name] && errors[name];
  const isDisabled = disabled || isSubmitting;

  const handleSelectChange = (e) => {
    if (multiple) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
      handleChange(name, selectedOptions);
    } else {
      handleChange(name, e.target.value);
    }
  };

  return (
    <div className={containerClassName}>
      {label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
      <div className="relative z-20 bg-transparent dark:bg-[#1A222C]">
        <select
          name={name}
          value={value}
          multiple={multiple}
          onChange={handleSelectChange}
          onBlur={() => handleBlur(name)}
          disabled={isDisabled}
          className={`relative z-20 w-full appearance-none rounded-lg border bg-transparent py-4 px-6 outline-none transition ${
            error 
              ? 'border-[#DC3545] focus:border-[#DC3545]' 
              : 'border-stroke focus:border-primary dark:border-[#2E3A47] dark:focus:border-primary'
          } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
        >
          {!multiple && (
            <option value="" disabled className="text-body dark:text-bodydark">
              {placeholder}
            </option>
          )}
          {options.map((opt, index) => (
            <option key={index} value={opt.value} className="text-body dark:text-bodydark">
              {opt.label}
            </option>
          ))}
        </select>

        {!multiple && (
          <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
            <ChevronDown className="w-5 h-5" />
          </span>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-[#DC3545]">{error}</p>}
    </div>
  );
};
