import { X } from 'lucide-react';
import { Form } from './Form/Form';

const FormModal = ({ 
  isOpen, 
  onClose, 
  title, 
  initialValues, 
  validationRules, 
  onSubmit, 
  children,
  submitText = 'Save',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-default dark:bg-[#24303F] max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between border-b border-stroke pb-4 dark:border-[#2E3A47]">
          <h3 className="text-xl font-bold text-[#1C2434] dark:text-white">
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <Form
          initialValues={initialValues}
          validationRules={validationRules}
          onSubmit={onSubmit}
        >
          {children}
          
          <div className="mt-6 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="rounded-md border border-stroke dark:border-[#2E3A47] px-6 py-2 font-medium text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A] transition"
            >
              {cancelText}
            </button>
            <button 
              type="submit"
              className="rounded-md bg-[#3C50E0] px-6 py-2 font-medium text-white hover:bg-opacity-90 transition"
            >
              {submitText}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormModal;
