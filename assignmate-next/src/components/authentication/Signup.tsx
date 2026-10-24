'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Check, X, Loader2 } from 'lucide-react';
import AuthLayout from '@/src/components/authentication/AuthCardWrapper';
import { authService } from '@/src/services/auth.service';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/src/context/NotificationContext';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useNotification();

  // Username validation & message state
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [usernameMessage, setUsernameMessage] = useState<string>('');

  // Password requirements calculation
  const hasMinLength = password.length >= 7;
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasCapitalLetter && hasNumber;

  // Debounced username availability check using authService
  useEffect(() => {
    const cleanUsername = username.toLowerCase().trim();

    if (!cleanUsername) {
      setIsUsernameAvailable(null);
      setUsernameMessage('');
      setIsCheckingUsername(false);
      return;
    }

    setIsCheckingUsername(true);
    setIsUsernameAvailable(null);
    setUsernameMessage('');

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        // Call your auth service method
        const data = await authService.checkUsername(cleanUsername);

        setIsUsernameAvailable(data.available);
        // Display the backend message right under the input (or fallback if empty)
        setUsernameMessage(
          data.message ||
            (data.available
              ? 'Username is available'
              : 'Username is already taken')
        );
      } catch (error: any) {
        setIsUsernameAvailable(false);
        setUsernameMessage(error.message || 'Failed to check username');
      } finally {
        setIsCheckingUsername(false);
      }
    }, 800); // 800ms debounce delay

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || !isUsernameAvailable) return;

    setIsLoading(true);
    try {
      // Mock simulation or your auth register call
      await new Promise(resolve => setTimeout(resolve, 2000));

      await authService.register({
        username,
        email,
        password,
      });

      toast.success('Account created successfully');

      router.replace('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout mode="signup">
      <form onSubmit={handleSignupSubmit} className="space-y-4">
        {/* USERNAME FIELD */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={username}
              onChange={e =>
                setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))
              }
              placeholder="e.g. chris_dev"
              className={`w-full bg-slate-900/90 border rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                isUsernameAvailable === false
                  ? 'border-rose-500/50 focus:border-rose-500'
                  : isUsernameAvailable === true
                    ? 'border-emerald-500/50 focus:border-emerald-500'
                    : 'border-slate-800 focus:border-blue-500'
              }`}
            />
            {/* Status Icon inside input right side */}
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
              {isCheckingUsername && (
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              )}
              {!isCheckingUsername && isUsernameAvailable === true && (
                <Check className="w-4 h-4 text-emerald-400" />
              )}
              {!isCheckingUsername && isUsernameAvailable === false && (
                <X className="w-4 h-4 text-rose-400" />
              )}
            </div>
          </div>

          {/* DYNAMIC MESSAGE DISPLAYED UNDERNEATH */}
          {usernameMessage && (
            <p
              className={`mt-1.5 text-[11px] font-medium ${
                isUsernameAvailable ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {usernameMessage}
            </p>
          )}
        </div>

        {/* EMAIL FIELD */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@gmail.com"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* PASSWORD FIELD */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Password Validation Checklist */}
          <div className="mt-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5">
            <p className="text-[11px] font-semibold text-slate-400 mb-1">
              Password Requirements:
            </p>

            <div className="flex items-center gap-2 text-xs">
              {hasMinLength ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span
                className={hasMinLength ? 'text-slate-200' : 'text-slate-500'}
              >
                At least 7 characters
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {hasCapitalLetter ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span
                className={
                  hasCapitalLetter ? 'text-slate-200' : 'text-slate-500'
                }
              >
                At least 1 capital letter (A-Z)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {hasNumber ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span className={hasNumber ? 'text-slate-200' : 'text-slate-500'}>
                At least 1 number (0-9)
              </span>
            </div>
          </div>
        </div>
        {/* SUBMIT BUTTON WITH LOADING STATE */}
        <button
          type="submit"
          disabled={!isPasswordValid || !isUsernameAvailable || isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all text-sm shadow-md shadow-blue-600/20 active:scale-95 mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      {/* DIVIDER */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800" />
        </div>
        <span className="relative bg-[#0b0f17] px-3 text-xs text-slate-500 uppercase">
          Or continue with
        </span>
      </div>

      {/* GOOGLE AUTH BUTTON */}
      <button
        type="button"
        className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium rounded-xl transition-all text-xs flex items-center justify-center gap-3"
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
        Continue with Google
      </button>
    </AuthLayout>
  );
}
