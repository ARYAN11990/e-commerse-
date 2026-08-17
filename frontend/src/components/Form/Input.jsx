import React, { useState } from 'react';
import { useFormContext } from './Form';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  name,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  disabled = false,
  className = "",
  containerClassName = "mb-4",
}) => {
  const { values, errors, touched, handleChange, handleBlur, isSubmitting } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const value = values[name] !== undefined ? values[name] : '';
  const error = touched[name] && errors[name];
  const inputType = type === 'password' && showPassword ? 'text' : type;
  const isDisabled = disabled || isSubmitting;

  return (
    <div className={containerClassName}>
      {label && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>}
      <div className="relative">
        {/* If there is no icon but type is password, we still add pr-10 for the eye icon */}
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          disabled={isDisabled}
          className={`w-full rounded-lg border bg-transparent py-4 pl-6 ${
            (Icon || type === 'password') ? 'pr-12' : 'pr-6'
          } outline-none focus-visible:shadow-none dark:bg-[#1A222C] transition ${
            error 
              ? 'border-[#DC3545] focus:border-[#DC3545]' 
              : 'border-stroke focus:border-primary dark:border-[#2E3A47] dark:focus:border-primary'
          } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
        />
        
        {Icon && type !== 'password' && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF]">
            <Icon className="w-5 h-5" />
          </span>
        )}

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#8A99AF] hover:text-[#1C2434] dark:hover:text-white transition"
            disabled={isDisabled}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-[#DC3545]">{error}</p>}
    </div>
  );
};
