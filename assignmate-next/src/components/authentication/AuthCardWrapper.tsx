'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/src/components/shared/LoadingScreen';
import { usePathname } from 'next/navigation';

import '@/src/styles/auth/authPage.css';

import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const loginPath = '/auth/login';
  const signUpPath = '/auth/signup';

  const isLogin = pathname === loginPath;
  const isSignup = pathname === signUpPath;

  return (
    <>
      <section className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to AssignMate</h1>
            <p>Your assignment studio</p>
          </div>

          <div className="auth-tabs">
            <Link
              className={`auth-tab ${isSignup ? 'active' : ''}`}
              href={signUpPath}
            >
              Sign up
            </Link>
            <Link
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              href={loginPath}
            >
              Login
            </Link>
          </div>
          <div>{children}</div>

          <p className="auth-footer-text">
            {isLogin
              ? 'Log in, Start right where you stopped!'
              : 'Assignments everywhere you go.'}
          </p>
        </div>
      </section>
    </>
  );
}
