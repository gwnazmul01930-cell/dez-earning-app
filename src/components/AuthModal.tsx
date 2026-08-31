import React, { useState } from 'react';
import { X, User, Mail, Lock, Share2, LogIn, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referCode, setReferCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      alert('সবগুলো প্রয়োজনীয় ঘর পূরণ করুন!');
      return;
    }

    onLoginSuccess({
      name: isRegister ? name : 'MD NAZMUL',
      email: email,
      referralCode: isRegister ? (referCode || 'DEZ' + Math.floor(1000 + Math.random() * 9000)) : '9965429',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* BLUE TOP HEADER BAR AS IN SCREENSHOT */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-2">
            {isRegister ? <UserPlus className="h-7 w-7" /> : <LogIn className="h-7 w-7" />}
          </div>

          <h2 className="text-xl font-black">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-blue-100 mt-0.5">
            {isRegister ? 'Join our premium platform today' : 'Login to your DEZ account'}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Enter secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Refer Code (Optional)
              </label>
              <div className="relative">
                <Share2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="5486003"
                  value={referCode}
                  onChange={(e) => setReferCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="press flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 py-3.5 text-xs font-black text-white shadow-md transition-all mt-2"
          >
            {isRegister ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            <span>{isRegister ? 'CREATE ACCOUNT' : 'LOGIN NOW'}</span>
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              {isRegister
                ? 'Already have an account? Login here'
                : "Don't have an account? Register now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
