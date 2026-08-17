import React from 'react';
import { useFormContext } from './Form';

export const Toggle = ({
  name,
  label,
  description,
  disabled = false,
  containerClassName = "mb-6 flex justify-between items-center",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();

  const isChecked = !!values[name];
  const error = touched[name] && errors[name];
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={containerClassName}>
      {(label || description) && (
        <div className="mr-4">
          {label && <h4 className="text-sm font-bold text-[#1C2434] dark:text-white">{label}</h4>}
          {description && <p className="text-sm font-medium text-[#64748B] dark:text-[#8A99AF]">{description}</p>}
        </div>
      )}
      
      <div className="flex flex-col items-end">
        <label className={`flex cursor-pointer select-none items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <div className="relative">
            <input
              type="checkbox"
              name={name}
              className="sr-only"
              checked={isChecked}
              onChange={(e) => handleChange(name, e.target.checked)}
              onBlur={() => handleBlur(name)}
              disabled={isDisabled}
            />
            <div className={`block h-6 w-10 rounded-full transition ${isChecked ? 'bg-[#3C50E0]' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <div className={`absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${isChecked ? 'right-1' : 'left-1'}`}></div>
          </div>
        </label>
        {error && <p className="mt-1 text-xs text-[#DC3545]">{error}</p>}
      </div>
    </div>
  );
};
