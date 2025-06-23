import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Placeholder for real registration logic
    setTimeout(() => {
      setLoading(false);
      if (email && password && name) {
        navigate('/login');
      } else {
        setError('Please fill in all fields');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/images/logo.png" alt="Logo" className="h-20 w-20 mb-4" />
          <h2 className="text-3xl font-bold text-[#08272a] mb-2">Join TechAdmirers</h2>
          <p className="text-gray-600 text-center">Create your account to start learning</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-[#08272a] font-semibold text-sm uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08272a] focus:border-transparent transition-all duration-200 bg-white text-[#08272a] placeholder-gray-400"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#08272a] font-semibold text-sm uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08272a] focus:border-transparent transition-all duration-200 bg-white text-[#08272a] placeholder-gray-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#08272a] font-semibold text-sm uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08272a] focus:border-transparent transition-all duration-200 bg-white text-[#08272a] placeholder-gray-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Create a strong password"
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-red-600 text-sm font-medium">{error}</div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-[#08272a] text-white py-3 rounded-xl font-semibold hover:bg-[#08272a]/90 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-[#08272a] font-semibold hover:text-[#08272a]/80 transition-colors duration-200 underline decoration-2 underline-offset-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 