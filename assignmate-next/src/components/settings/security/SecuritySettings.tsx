'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import '@/src/styles/settings/settings-account.css';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SecuritySettings() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user } = useAuth();
  useEffect(() => {
    setEmail(user?.email || email);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Link
        href={'/dashboard/settings'}
        className="settings-back-link mt-6 mx-5"
      >
        <ArrowLeft className="h-4 w-4" /> {'  '} Back to settings
      </Link>
      <div className="settings-section mx-5">
        {/* Top Banner for Unimplemented Feature */}
        <div className="feature-notice-bar">
          <span className="notice-icon">🚧</span>
          <span className="notice-text">
            Security settings (email & password updates) are currently under
            development and not functional yet.
          </span>
        </div>

        <div className="settings-section-header">
          <h2 className="settings-section-title">Security & Credentials</h2>
        </div>

        <form onSubmit={handleSubmit} className="security-form-container">
          {/* Email Change Section */}
          <div className="security-sub-block">
            <h3 className="security-sub-title">Change Email Address</h3>
            <div className="form-group">
              <label htmlFor="newEmail">Current Email Address</label>
              <input
                type="email"
                id="newEmail"
                placeholder="e.g. new.email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled
              />
            </div>
          </div>

          <div className="section-divider" />

          {/* Password Update Section */}
          <div className="security-sub-block">
            <h3 className="security-sub-title">Update Password</h3>
            <div className="settings-grid">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button type="submit" disabled className="save-btn">
              Update Security Credentials
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
