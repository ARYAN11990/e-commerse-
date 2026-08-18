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
  ...props
}) => {
  const context = useFormContext();

  const inputValue = context && context.values[name] !== undefined ? context.values[name] : (props.value !== undefined ? props.value : (multiple ? [] : ''));
  const inputError = context ? (context.touched[name] && context.errors[name]) : props.error;
  const isSubmitting = context ? context.isSubmitting : false;
  const isDisabled = disabled || isSubmitting;

  const handleSelectChange = (e) => {
    let newValue;
    if (multiple) {
      newValue = Array.from(e.target.selectedOptions).map(opt => opt.value);
    } else {
      newValue = e.target.value;
    }
    
    if (context) {
      context.handleChange(name, newValue);
    }
    if (props.onChange) {
      // Allow custom onChange to get either event or value directly depending on their implementation
      props.onChange(newValue, e);
    }
  };

  const handleSelectBlur = (e) => {
    if (context) {
      context.handleBlur(name);
    }
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <div className={containerClassName}>
      {label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
      <div className="relative z-20 bg-transparent dark:bg-[#1A222C]">
        <select
          name={name}
          value={inputValue}
          multiple={multiple}
          onChange={handleSelectChange}
          onBlur={handleSelectBlur}
          disabled={isDisabled}
          className={`relative z-20 w-full appearance-none rounded-lg border bg-transparent py-4 px-6 outline-none transition ${
            inputError 
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
      {inputError && <p className="mt-1.5 text-sm text-[#DC3545]">{inputError}</p>}
    </div>
  );
};
