import React from 'react';
import { useFormContext } from './Form';

export const Textarea = ({
  name,
  label,
  placeholder,
  rows = 3,
  disabled = false,
  className = "",
  containerClassName = "mb-4",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();

  const value = values[name] !== undefined ? values[name] : '';
  const error = touched[name] && errors[name];
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={containerClassName}>
      {label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={(e) => handleChange(name, e.target.value)}
        onBlur={() => handleBlur(name)}
        disabled={isDisabled}
        className={`w-full rounded-lg border bg-transparent py-3 pl-6 pr-6 outline-none focus-visible:shadow-none dark:bg-[#1A222C] transition resize-y ${
          error 
            ? 'border-[#DC3545] focus:border-[#DC3545]' 
            : 'border-stroke focus:border-primary dark:border-[#2E3A47] dark:focus:border-primary'
        } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      />
      {error && <p className="mt-1.5 text-sm text-[#DC3545]">{error}</p>}
    </div>
  );
};
