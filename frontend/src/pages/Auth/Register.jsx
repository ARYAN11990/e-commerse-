import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Form, Input } from '../../components/Form';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const validationRules = {
    username: {
      required: 'Username is required',
      minLength: 3,
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      minLength: 6,
    }
  };

  const handleSubmit = async (values) => {
    await register({ 
      username: values.username, 
      email: values.email, 
      password: values.password, 
      full_name: values.username 
    });
    navigate('/login');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-[#1A222C]">
      <div className="w-full max-w-md rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign Up for TailAdmin
        </h2>
        
        <Form 
          initialValues={{ username: '', email: '', password: '' }} 
          validationRules={validationRules} 
          onSubmit={handleSubmit}
        >
          <Input 
            name="username" 
            label="Username" 
            placeholder="Enter your username" 
          />
          <Input 
            name="email" 
            label="Email" 
            type="email"
            placeholder="Enter your email" 
          />
          <Input 
            name="password" 
            label="Password" 
            type="password"
            placeholder="Enter your password" 
            containerClassName="mb-6"
          />
          
          <div className="mb-5">
            <SubmitButton text="Create Account" loadingText="Creating Account..." />
          </div>
          <div className="mt-6 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </Form>
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

export default Register;
