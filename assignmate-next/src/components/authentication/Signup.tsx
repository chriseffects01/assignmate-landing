'use client';
import '@/src/styles/auth/authPage.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../shared/LoadingScreen';
import { useAuth } from '@/src/context/AuthContext';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth =  useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await auth.register({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      router.push('/dashboard');
    } catch (error: any) {
      console.log(error.message);
      console.error('My error message:', error);
      throw new Error(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message="Loading your dashboard... " />}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="input-form-firstname"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
          placeholder="First Name"
          className="auth-input"
        />

        <input
          type="text"
          name="input-form-lastname"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
          }}
          placeholder="Last name"
          className="auth-input"
        />

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

        <button
          type="submit"
          className="auth-submit"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
