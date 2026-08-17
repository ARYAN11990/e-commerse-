import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '../../components/Form';

const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const validationRules = {
    password: {
      required: 'Password is required',
      minLength: 6,
    },
    confirm_password: {
      required: 'Please confirm your password',
      match: 'password',
      matchMessage: 'Passwords do not match',
    }
  };

  const handleSubmit = async (values, { setApiError }) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmitted(true);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-[#1A222C]">
      <div className="w-full max-w-md rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Reset Password
        </h2>
        {submitted ? (
          <div className="text-center">
            <p className="mb-4 text-[#10B981]">Password has been reset successfully.</p>
            <Link to="/login" className="text-primary hover:underline">Return to Sign In</Link>
          </div>
        ) : (
          <Form 
            initialValues={{ password: '', confirm_password: '' }} 
            validationRules={validationRules} 
            onSubmit={handleSubmit}
          >
            <Input 
              name="password" 
              label="New Password" 
              type="password"
              placeholder="Enter your new password" 
            />
            <Input 
              name="confirm_password" 
              label="Confirm Password" 
              type="password"
              placeholder="Confirm your new password" 
              containerClassName="mb-5"
            />
            
            <div className="mb-5">
              <SubmitButton text="Save New Password" loadingText="Saving..." />
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

import { useFormContext } from '../../components/Form';
const SubmitButton = ({ text, loadingText }) => {
  const { isSubmitting } = useFormContext();
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
};

export default ResetPassword;
