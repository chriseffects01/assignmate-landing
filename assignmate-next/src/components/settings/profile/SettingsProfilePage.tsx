'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import { useNotification } from '@/src/context/NotificationContext';
import '@/src/styles/settings/settings-profile.css';

interface ProfileFormState {
  firstName: string;
  middleName: string;
  lastName: string;
  accountType: 'student' | 'business';

  // Academic fields

  level: string;
  department: string;
  faculty: string;
  registrationNumber: string;

  //Business fields

  businessName: string;
  businessPhone: string;
}

export default function ProfileSettingsPage() {
  const { user, updateUser } = useAuth();
  const { toast } = useNotification();

  const [formData, setFormData] = useState<ProfileFormState>({
    firstName: '',
    middleName: '',
    lastName: '',
    accountType: 'student',
    level: '',
    department: '',
    faculty: '',
    registrationNumber: '',
    businessName: '',
    businessPhone: '',
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        accountType: (user.accountType as 'student' | 'business') || 'student',
        level: user.level || '',
        department: user.department || '',
        faculty: user.faculty || '',
        registrationNumber: user.registrationNumber || '',
        businessName: user.businessName || '',
        businessPhone: user.businessPhone || '',
      });
      console.log(user);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        accountType: formData.accountType,
        ...(formData.accountType === 'student'
          ? {
              level: formData.level,
              department: formData.department,
              faculty: formData.faculty,
              registrationNumber: formData.registrationNumber,
            }
          : {
              businessName: formData.businessName,
              businessPhone: formData.businessPhone,
            }),
      };
      await new Promise(resolve => setTimeout(resolve, 1500));
      const updatedUser = await updateUser(payload);

      if (updatedUser) {
        setFormData({
          firstName: updatedUser.firstName ?? '',
          middleName: updatedUser.middleName ?? '',
          lastName: updatedUser.lastName ?? '',
          level: updatedUser.level ?? '',
          department: updatedUser.department ?? '',
          faculty: updatedUser.faculty ?? '',
          registrationNumber: updatedUser.registrationNumber ?? '',
          businessName: updatedUser.businessName ?? '',
          businessPhone: updatedUser.businessPhone ?? '',
          accountType: updatedUser.accountType ?? 'student',
        });
      }
      // toast.success('Profile Updated successfully');
    } catch (e: any) {
      console.error('Failed to update profile:', e);
      toast.error('Failed to update User profile, please try again');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="settings-container">
      {/* Back to Settings Navigation */}
      <Link href="/dashboard/settings" className="settings-back-link">
        ← Back to Settings
      </Link>

      <h1 className="settings-title">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* SECTION 1: Personal Information */}
        <div className="settings-section">
          <h2 className="settings-section-title">Personal Information</h2>

          <div className="settings-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Read-Only Information */}
          <div className="settings-grid">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={user?.username}
                disabled
                className="input-disabled"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="text"
                value={user?.email}
                disabled
                className="input-disabled"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Account Type */}
        <div className="settings-section">
          <h2 className="settings-section-title">Account Type</h2>

          <div className="account-type-selector">
            <button
              type="button"
              className={`account-type-btn ${formData.accountType === 'student' ? 'active' : ''}`}
              onClick={() =>
                setFormData(prev => ({ ...prev, accountType: 'student' }))
              }
            >
              Student
            </button>
            <button
              type="button"
              className={`account-type-btn ${formData.accountType === 'business' ? 'active' : ''}`}
              onClick={() =>
                setFormData(prev => ({ ...prev, accountType: 'business' }))
              }
            >
              Business
            </button>
          </div>
        </div>

        {/* SECTION 3: Account-Specific Conditional Fields */}
        {formData.accountType === 'student' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Academic Information</h2>

            <div className="settings-grid">
              <div className="form-group">
                <label htmlFor="level">Level</label>
                <input
                  type="text"
                  id="level"
                  name="level"
                  placeholder="e.g. 100, 200, 300"
                  value={formData.level}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  placeholder="e.g. Computer Science"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="faculty">Faculty</label>
                <input
                  type="text"
                  id="faculty"
                  name="faculty"
                  placeholder="e.g. Physical Sciences"
                  value={formData.faculty}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="registrationNumber">Reg Number</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  placeholder="e.g. 2021/248102"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {formData.accountType === 'business' && (
          <div className="settings-section">
            <h2 className="settings-section-title">Business Information</h2>

            <div className="settings-grid">
              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessPhone">Business Phone</label>
                <input
                  type="text"
                  id="businessPhone"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="settings-actions">
          <button type="submit" disabled={isSaving} className="save-btn">
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
