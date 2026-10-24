'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowLeft } from 'lucide-react';

// Right side showcase image import
import StudentLaptop from '@/public/Landing Page/Student with laptop/Student-with-laptop.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  mode: 'login' | 'signup';
}

export default function AuthLayout({ children, mode }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </header>

      {/* Main Split Grid Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full mx-auto p-6 gap-8 items-center">
        {/* LEFT COLUMN: AUTH FORM CONTENT */}
        <div className="w-full max-w-md mx-auto">
          {/* Header Branding */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to AssignMate
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Your assignment studio
            </p>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 mb-6">
            <Link
              href="/auth/signup"
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </Link>
          </div>

          {/* Form Content Injected Here */}
          {children}

          {/* Subtext Footer */}
          <p className="text-center text-xs text-slate-500 mt-6">
            {mode === 'signup'
              ? 'Assignments everywhere you go.'
              : 'Log in, Start right where you stopped!'}
          </p>
        </div>

        {/* RIGHT COLUMN: SHOWCASE IMAGE */}
        <div className="hidden lg:flex flex-col justify-center items-center relative rounded-3xl border border-slate-800 bg-slate-900/40 p-4 shadow-2xl backdrop-blur-xl overflow-hidden aspect-4/3">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={StudentLaptop}
              alt="Student working on AssignMate"
              fill
              sizes="(max-width: 1200px) 50vw, 600px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="p-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} AssignMate. All rights reserved.
      </footer>
    </div>
  );
}
