import Link from 'next/link';
import '@/src/styles/settings/settings-home.css';

interface SettingsOption {
  title: string;
  description: string;
  href: string;
}

export default function SettingsPage() {
  const settingsOptions: SettingsOption[] = [
    {
      title: 'Profile Settings',
      description:
        'Personal information • Account type • Student / Business information',
      href: '/dashboard/settings/profile',
    },
    {
      title: 'Account Settings',
      description: 'Account information • Subscription • Billing',
      href: '/dashboard/settings/account',
    },
    {
      title: 'Preferences',
      description: 'Theme • Notifications • Other app preferences',
      href: '/dashboard/settings/preferences',
    },
    {
      title: 'Security',
      description: 'Change password • Sessions / devices',
      href: '/dashboard/settings/security',
    },
    {
      title: 'Feedback',
      description: 'Report a problem • Suggest a feature • General feedback',
      href: '/dashboard/settings/feedback',
    },
  ];
  return (
    <div className="settings-container">
      <h1 className="settings-title">Configure your settings</h1>

      <div className="settings-list">
        {settingsOptions.map(option => (
          <Link key={option.href} href={option.href} className="settings-card">
            <div className="settings-card-content">
              <h2 className="settings-card-title">{option.title}</h2>
              <p className="settings-card-description">{option.description}</p>
            </div>
            <span className="settings-card-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
