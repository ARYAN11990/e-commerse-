import React from 'react';
import { useFormContext } from './Form';
import { Check } from 'lucide-react';

export const Checkbox = ({
  name,
  label,
  disabled = false,
  className = "",
  containerClassName = "mb-4",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();

  const value = !!values[name];
  const error = touched[name] && errors[name];
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={containerClassName}>
      <label className={`flex cursor-pointer items-center gap-3 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            className="sr-only"
            checked={value}
            onChange={(e) => handleChange(name, e.target.checked)}
            onBlur={() => handleBlur(name)}
            disabled={isDisabled}
          />
          <div
            className={`flex h-5 w-5 items-center justify-center rounded border ${
              value 
                ? 'border-primary bg-primary' 
                : (error ? 'border-[#DC3545]' : 'border-stroke dark:border-[#2E3A47] bg-transparent')
            } ${className}`}
          >
            <span className={`text-white transition ${value ? 'opacity-100' : 'opacity-0'}`}>
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </span>
          </div>
        </div>
        {label && <span className="font-medium text-black dark:text-white">{label}</span>}
      </label>
      {error && <p className="mt-1.5 text-sm text-[#DC3545]">{error}</p>}
    </div>
  );
};
