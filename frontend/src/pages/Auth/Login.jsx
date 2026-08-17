import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Form, Input } from '../../components/Form';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationRules = {
    username: {
      required: 'Username is required',
    },
    password: {
      required: 'Password is required',
    }
  };

  const handleSubmit = async (values) => {
    // Let Form handle the errors and isSubmitting state
    await login(values.username, values.password);
    navigate('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-[#1A222C]">
      <div className="w-full max-w-md rounded-lg border border-stroke bg-white p-8 shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign In to TailAdmin
        </h2>
        
        <Form 
          initialValues={{ username: '', password: '' }} 
          validationRules={validationRules} 
          onSubmit={handleSubmit}
        >
          <Input 
            name="username" 
            label="Username" 
            placeholder="Enter your username" 
          />
          <Input 
            name="password" 
            label="Password" 
            type="password"
            placeholder="Enter your password" 
            containerClassName="mb-6"
          />
          
          <div className="mb-5">
            {/* We could use context here for the button disabled state, but Form handles isSubmitting inside its onSubmit by awaiting our promise. 
                Wait, the button needs to know isSubmitting. Let's create a SubmitButton component or use render props/context.
                Since useFormContext requires being INSIDE the Form, we can make a custom button component. */}
            <SubmitButton text="Sign In" loadingText="Signing In..." />
          </div>
          <div className="mt-6 text-center">
            <p>
              Don’t have any account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

// Helper component to access FormContext
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

export default Login;
