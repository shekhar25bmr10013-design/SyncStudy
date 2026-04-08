import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import GradientText from '../components/ui/GradientText';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { validateLoginForm } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call (mock login)
    setTimeout(() => {
      // Mock user data - In production, this would come from Firebase
      const mockUser = {
        id: '123',
        name: formData.email.split('@')[0],
        email: formData.email,
        avatar: null
      };
      
      login(mockUser);
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Mock Google login
    setTimeout(() => {
      const mockGoogleUser = {
        id: 'google_123',
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: null
      };
      
      login(mockGoogleUser);
      setIsLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="bg-dark-800/40 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold">
            Welcome Back to <GradientText>SyncStudy</GradientText>
          </h2>
          <p className="text-gray-400 mt-2">
            Sign in to continue your study journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            icon={Mail}
            required
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon={Lock}
            required
            error={errors.password}
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => alert('Reset link sent to your email!')}
              className="text-sm text-primary hover:text-accent transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-800/40 text-gray-400">or</span>
          </div>
        </div>

        {/* Google Sign In */}
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <Chrome className="h-5 w-5 mr-2" />
          Continue with Google
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-accent font-semibold transition-colors">
            Sign up
          </Link>
        </p>

        {/* Demo Credentials (for hackathon) */}
        <div className="mt-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-center text-gray-400">
            <span className="text-primary">Demo Credentials:</span><br />
            Email: demo@syncstudy.com<br />
            Password: any password (min 6 chars)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

