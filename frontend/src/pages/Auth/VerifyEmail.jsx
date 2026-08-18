import { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Please wait while we verify your email address...');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid or missing verification token.');
        return;
      }

      try {
        await api.post('/auth/verify-email', { token });
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        showToast('Email verified successfully', 'success');
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Verification failed. The token may be expired or invalid.');
        showToast('Email verification failed', 'error');
      }
    };

    verifyToken();
  }, [token, showToast]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-stroke bg-white p-8 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray/50 dark:bg-meta-4">
          {status === 'verifying' && <Mail className="h-8 w-8 text-primary animate-pulse" />}
          {status === 'success' && <CheckCircle2 className="h-8 w-8 text-success" />}
          {status === 'error' && <XCircle className="h-8 w-8 text-danger" />}
        </div>
        
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          {status === 'verifying' && 'Verifying Email'}
          {status === 'success' && 'Email Verified'}
          {status === 'error' && 'Verification Failed'}
        </h2>
        
        <p className="mb-8 text-[#64748B]">
          {message}
        </p>
        
        {status !== 'verifying' && (
          <button
            onClick={() => navigate('/login')}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-stroke p-3 text-black transition hover:bg-gray dark:border-strokedark dark:text-white dark:hover:bg-meta-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
