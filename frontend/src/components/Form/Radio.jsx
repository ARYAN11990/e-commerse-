import React from 'react';
import { useFormContext } from './Form';

export const Radio = ({
  name,
  label,
  value,
  disabled = false,
  className = "",
  containerClassName = "mb-4",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();

  const isChecked = values[name] === value;
  const error = touched[name] && errors[name];
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={containerClassName}>
      <label className={`flex cursor-pointer items-center gap-3 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative">
          <input
            type="radio"
            name={name}
            className="sr-only"
            value={value}
            checked={isChecked}
            onChange={(e) => handleChange(name, e.target.value)}
            onBlur={() => handleBlur(name)}
            disabled={isDisabled}
          />
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
              isChecked 
                ? 'border-primary' 
                : (error ? 'border-[#DC3545]' : 'border-stroke dark:border-[#2E3A47]')
            } ${className}`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-primary transition ${
                isChecked ? 'opacity-100' : 'opacity-0'
              }`}
            ></span>
          </div>
        </div>
        {label && <span className="font-medium text-black dark:text-white">{label}</span>}
      </label>
      {error && <p className="mt-1.5 text-sm text-[#DC3545]">{error}</p>}
    </div>
  );
};
