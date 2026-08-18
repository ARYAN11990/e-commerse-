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
  ...props
}) => {
  const context = useFormContext();

  const inputValue = context && context.values[name] !== undefined ? context.values[name] : (props.value !== undefined ? props.value : '');
  const inputError = context ? (context.touched[name] && context.errors[name]) : props.error;
  const isSubmitting = context ? context.isSubmitting : false;
  const isDisabled = disabled || isSubmitting;

  const handleInputChange = (e) => {
    if (context) {
      context.handleChange(name, e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleInputBlur = (e) => {
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
      <textarea
        name={name}
        placeholder={placeholder}
        value={inputValue}
        rows={rows}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={isDisabled}
        className={`w-full rounded-lg border bg-transparent py-3 pl-6 pr-6 outline-none focus-visible:shadow-none dark:bg-[#1A222C] transition resize-y ${
          inputError 
            ? 'border-[#DC3545] focus:border-[#DC3545]' 
            : 'border-stroke focus:border-primary dark:border-[#2E3A47] dark:focus:border-primary'
        } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      />
      {inputError && <p className="mt-1.5 text-sm text-[#DC3545]">{inputError}</p>}
    </div>
  );
};
