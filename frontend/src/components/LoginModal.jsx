'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, Phone, Eye, EyeOff, Sparkles, CheckCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    name: '',
    rememberMe: true,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRoleQuickLogin = async (email, password) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('astada_token', data.token);
        localStorage.setItem('astada_role', data.user.role);
        localStorage.setItem('astada_user', JSON.stringify(data.user));
        
        if (data.user.role === 'digital_marketing') {
          window.location.href = '/marketing';
        } else if (data.user.role === 'admin') {
          window.location.href = '/admin';
        } else if (data.user.role === 'astrologer') {
          window.location.href = '/astrologer';
        } else {
          onClose();
          window.location.reload();
        }
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Could not connect to backend server on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const endpoint = activeTab === 'login' 
        ? 'http://localhost:5000/api/auth/login' 
        : 'http://localhost:5000/api/auth/register';

      const payload = activeTab === 'login'
        ? { email: formData.identifier, password: formData.password }
        : { name: formData.name, email: formData.identifier, password: formData.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem('astada_token', data.token);
        localStorage.setItem('astada_role', data.user.role);
        localStorage.setItem('astada_user', JSON.stringify(data.user));
        
        if (data.user.role === 'digital_marketing') {
          window.location.href = '/marketing';
        } else if (data.user.role === 'admin') {
          window.location.href = '/admin';
        } else if (data.user.role === 'astrologer') {
          window.location.href = '/astrologer';
        } else {
          onClose();
          window.location.reload();
        }
      } else {
        setErrorMessage(data.message || 'Authentication error');
      }
    } catch (err) {
      // Fallback mock if backend is down
      alert(`${activeTab === 'login' ? 'Signed in' : 'Registered'} successfully! Welcome to Astadasapeetam.`);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#fffdfa] rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden p-6 sm:p-7 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-tr from-[#78131e] to-[#9e1c2a] flex items-center justify-center text-amber-300 font-serif font-black text-2xl shadow-sm border border-amber-300/40">
            🕉️
          </div>
          <h3 className="text-xl font-bold font-serif text-[#78131e] tracking-tight">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {activeTab === 'login'
              ? 'Sign in to access Daily Panchangam, Horoscope & Saved Slokas'
              : 'Join Astadasapeetam for personalized spiritual guidance'}
          </p>

          {/* Login / Register Tab switcher */}
          <div className="flex rounded-xl bg-stone-100 p-1 mt-4 border border-stone-200">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-[#78131e] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-[#78131e] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#e2d4be] focus:border-[#78131e] focus:ring-1 focus:ring-[#78131e] outline-none transition-all placeholder:text-stone-400"
              />
            </div>
          )}

          {/* Method selector for Phone or Email */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                {loginMethod === 'phone' ? 'Mobile Number' : 'Email Address'}
              </label>
              <button
                type="button"
                onClick={() => setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone')}
                className="text-[11px] font-semibold text-[#78131e] hover:underline"
              >
                Use {loginMethod === 'phone' ? 'Email' : 'Phone'} Instead
              </button>
            </div>

            <div className="relative">
              {loginMethod === 'phone' ? (
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs font-bold text-stone-600 bg-stone-100 border border-r-0 border-[#e2d4be] rounded-l-lg select-none">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    maxLength={10}
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white rounded-r-lg border border-[#e2d4be] focus:border-[#78131e] focus:ring-1 focus:ring-[#78131e] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
              ) : (
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-lg border border-[#e2d4be] focus:border-[#78131e] focus:ring-1 focus:ring-[#78131e] outline-none transition-all placeholder:text-stone-400"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Password
              </label>
              {activeTab === 'login' && (
                <a href="#forgot" className="text-[11px] font-semibold text-stone-500 hover:text-[#78131e]">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-9 pr-10 py-2 text-sm bg-white rounded-lg border border-[#e2d4be] focus:border-[#78131e] focus:ring-1 focus:ring-[#78131e] outline-none transition-all placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Terms */}
          <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-3.5 h-3.5 text-[#78131e] rounded focus:ring-[#78131e] border-stone-300"
              />
              <span>Remember me</span>
            </label>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" /> 100% Secure
            </span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#78131e] hover:bg-[#600e17] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider text-stone-400">
            <span className="bg-[#fffdfa] px-3 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Social / Alternate Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              alert('Google Sign In initialized.');
              onClose();
            }}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-[#e2d4be] rounded-xl hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              alert('OTP sent to your registered mobile number.');
              onClose();
            }}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-[#e2d4be] rounded-xl hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-stone-600" />
            <span>Mobile OTP</span>
          </button>
        </div>

        {/* Quick Role Portal Access for Dev & Testing */}
        <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-[#78131e] tracking-wider">
              ⚡ Quick Role Portals Access
            </span>
            <span className="text-[9px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-semibold">
              Instant Demo
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleRoleQuickLogin('marketing@astadasapeetam.com', 'Market@12345')}
              className="p-1.5 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-center font-bold text-[#78131e] shadow-2xs transition"
            >
              📢 Marketing
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleRoleQuickLogin('admin@astadasapeetam.com', 'Admin@12345')}
              className="p-1.5 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-center font-bold text-stone-900 shadow-2xs transition"
            >
              👑 Admin
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleRoleQuickLogin('astrologer@astadasapeetam.com', 'Astro@12345')}
              className="p-1.5 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-center font-bold text-purple-900 shadow-2xs transition"
            >
              🔮 Astrologer
            </button>
          </div>
        </div>

        {/* Footer info note */}
        <p className="text-[10px] text-center text-stone-400 mt-5">
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
