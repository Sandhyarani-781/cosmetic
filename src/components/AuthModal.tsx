import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User as UserIcon, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, signupUser, showToast } = useShop();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'forgot') {
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      showToast(`Password reset link dispatched to ${email}`, 'info');
      setMode('login');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      signupUser(name, email);
    } else {
      loginUser(email, name || undefined);
    }
  };

  const handleDemoCustomerLogin = () => {
    loginUser('sophia.laurent@example.com', 'Sophia Laurent');
  };

  const handleDemoAdminLogin = () => {
    loginUser('admin@glowandgrace.com', 'Admin Director');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-[#F0E4E1] overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#7A6B6E] hover:text-[#2D2426] rounded-full hover:bg-[#FAF7F5]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#FAF7F5] px-8 pt-8 pb-6 text-center border-b border-[#F0E4E1]">
          <span className="font-serif text-3xl font-medium tracking-tight text-[#2D2426]">
            Glow & Grace
          </span>
          <p className="text-xs text-[#7A6B6E] mt-1">
            {mode === 'login' && 'Sign in to access your saved ritual and order history'}
            {mode === 'signup' && 'Join the Glow Club for 20% off and complimentary luxury samples'}
            {mode === 'forgot' && 'Reset your password with your registered email'}
          </p>
        </div>

        {/* Tabs for Login / Signup */}
        {mode !== 'forgot' && (
          <div className="flex border-b border-[#F0E4E1] bg-white">
            <button
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
                mode === 'login' ? 'text-[#8D382D]' : 'text-[#7A6B6E] hover:text-[#2D2426]'
              }`}
            >
              Sign In
              {mode === 'login' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#8D382D]" />
              )}
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
                mode === 'signup' ? 'text-[#8D382D]' : 'text-[#7A6B6E] hover:text-[#2D2426]'
              }`}
            >
              Create Account
              {mode === 'signup' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#8D382D]" />
              )}
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
              {error}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#A09395] absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Camilla Vance"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#2D2426] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A09395] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#2D2426]">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError('');
                    }}
                    className="text-[11px] text-[#8D382D] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A09395] absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#2D2426] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A09395] absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F5] border border-[#E8C5BE] rounded-xl text-xs text-[#2D2426] focus:outline-none focus:border-[#2D2426]"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#8D382D] border-gray-300 rounded focus:ring-[#8D382D]"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-[#5C4D50]">
                Remember me for 30 days
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#2D2426] hover:bg-[#423639] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
          >
            {mode === 'login' && 'Sign In'}
            {mode === 'signup' && 'Create My Account'}
            {mode === 'forgot' && 'Send Reset Link'}
          </button>

          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-xs text-[#7A6B6E] hover:underline"
            >
              Back to Sign In
            </button>
          )}

          {/* Instant Demo Quick Logins */}
          <div className="pt-4 border-t border-[#F5EBE8] text-center">
            <span className="text-[11px] text-[#A09395] uppercase tracking-wider block mb-2 font-medium">
              Instant Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoCustomerLogin}
                className="py-2 px-3 bg-[#FAF7F5] hover:bg-[#F5EBE8] border border-[#E8C5BE] rounded-xl text-[11px] font-semibold text-[#423639] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                Customer Demo
              </button>
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="py-2 px-3 bg-[#FAF7F5] hover:bg-[#F5EBE8] border border-[#E8C5BE] rounded-xl text-[11px] font-semibold text-[#423639] flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3 h-3 text-[#8D382D]" />
                Admin Demo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
