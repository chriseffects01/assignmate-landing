'use client';

import Link from 'next/link';
import AccountInfo from './AccountInfo';
import SubscriptionSection from './Subscription';
import BillingSection from './BillingSection';
import DangerZone from './DangerZone';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import '@/src/styles/settings/settings-account.css';
import { useNotification } from '@/src/context/NotificationContext';

export default function AccountSettingsMainPage() {
  const { user } = useAuth();
  const { toast, confirm, closeConfirm } = useNotification();

  const handleLogout = () => {
    toast.success('Logging out...');
  };

  const handleDeleteAccount = () => {
    confirm({
      title: 'Delete Account?',
      message: 'Are you sure you want to delete your account?',
      confirmText: 'Delete',
      cancelText: 'No',
      onConfirm: async () => {
        toast.success('Acoount deleted successfully');
        closeConfirm();
      },
      onCancel: closeConfirm,
    });
  };

  return (
    <div className="settings-container">
      <Link href={'/dashboard/settings'} className="settings-back-link">
        <ArrowLeft className="h-4 w-4" /> {'  '} Back to settings
      </Link>

      <h1 className="settings-title"> Account Settings</h1>

      <div className="settings-form">
        <AccountInfo user={user} />
        <SubscriptionSection />
        <BillingSection />
        <DangerZone
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
