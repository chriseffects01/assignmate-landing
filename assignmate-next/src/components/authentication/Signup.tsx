'use client';
import '@/src/styles/auth/authPage.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../shared/LoadingScreen';
import { useAuth } from '@/src/context/AuthContext';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        username,
        email,
        password,
      });

      router.push('/dashboard');
    } catch (error: any) {
      console.log(error.message);
      console.error('My error message:', error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your dashboard... " />}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="input-form-username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
          className="auth-input"
        />

        <input
          type="email"
          name="input-form-email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="student@gmail.com"
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          name="input-form-password"
          className="auth-input"
        />

        <button type="submit" className="auth-submit">
          Create Account
        </button>
      </form>
    </>
  );
}
