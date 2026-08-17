import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form fields must be used within a <Form> component');
  }
  return context;
};

export const Form = ({ 
  initialValues = {}, 
  validationRules = {}, 
  onSubmit, 
  children,
  className = "",
  resetOnSubmit = false
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setApiError(null);
    setApiSuccess(null);
  }, [JSON.stringify(initialValues)]);

  const validateField = (name, value, currentValues) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required) {
      if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        return typeof rules.required === 'string' ? rules.required : 'This field is required';
      }
    }
    
    if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return typeof rules.email === 'string' ? rules.email : 'Invalid email address';
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      return rules.minLengthMessage || `Must be at least ${rules.minLength} characters`;
    }
    
    if (rules.match && currentValues) {
      if (value !== currentValues[rules.match]) {
        return rules.matchMessage || 'Fields do not match';
      }
    }

    if (rules.custom) {
      return rules.custom(value, currentValues) || '';
    }

    return '';
  };

  const handleChange = (name, value) => {
    setValues(prev => {
      const newValues = { ...prev, [name]: value };
      
      if (touched[name]) {
        const error = validateField(name, value, newValues);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
      }
      
      return newValues;
    });
    setApiError(null);
    setApiSuccess(null);
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name], values);
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setApiSuccess(null);
    
    const newErrors = {};
    const newTouched = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      newTouched[name] = true;
      const error = validateField(name, values[name], values);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);

    if (isValid && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values, { setErrors, setApiError, setApiSuccess });
        if (resetOnSubmit) {
          setValues(initialValues);
          setTouched({});
          setErrors({});
        }
      } catch (err) {
        setApiError(err.message || "An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <FormContext.Provider value={{ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue: handleChange }}>
      <form onSubmit={handleSubmit} className={className} noValidate>
        {apiError && (
          <div className="mb-4 rounded-md border border-[#EF4444] bg-[#EF4444]/10 p-3 text-sm text-[#EF4444]">
            {apiError}
          </div>
        )}
        {apiSuccess && (
          <div className="mb-4 rounded-md border border-[#10B981] bg-[#10B981]/10 p-3 text-sm text-[#10B981]">
            {apiSuccess}
          </div>
        )}
        {children}
      </form>
    </FormContext.Provider>
  );
};
