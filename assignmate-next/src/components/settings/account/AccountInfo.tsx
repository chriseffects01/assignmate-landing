'use client';

import '@/src/styles/settings/settings-account.css';

export default function AccountInfo({ user }: { user: any }) {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Account Information</h2>

      <div className="settings-grid">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            value={user.email || 'N/A'}
            disabled
            className="input-disabled"
          />
        </div>

        <div className="form-group">
          <label>Account Type</label>
          <input
            type="text"
            value={
              user.accountType ? user.accountType.toUpperCase() : 'STUDENT'
            }
            disabled
            className="input-disabled"
          />
        </div>

        <div className="form-group">
          <label>Account ID</label>
          <input
            type="text"
            value={user._id || 'usr_2026_x89f'}
            disabled
            className="input-disabled"
          />
        </div>

        <div className="form-group">
          <label>Account Created</label>
          <input
            type="text"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : 'August 2026'
            }
            disabled
            className="input-disabled"
          />
        </div>
      </div>
    </div>
  );
}
