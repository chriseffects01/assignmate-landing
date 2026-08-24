'use client';

interface DangerZoneProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export default function DangerZone({
  onLogout,
  onDeleteAccount,
}: DangerZoneProps) {
  return (
    <div className="settings-section danger-section">
      <h2 className="settings-section-title text-danger">Danger Zone</h2>

      <div className="danger-actions">
        <div className="danger-item">
          <div>
            <h3 className="danger-item-title">Log Out</h3>
            <p className="danger-item-desc">
              Log out of your current session on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="btn-secondary-danger"
          >
            Log Out
          </button>
        </div>

        <div className="danger-item">
          <div>
            <h3 className="danger-item-title">Delete Account</h3>
            <p className="danger-item-desc">
              Permanently delete your account and all associated saved drafts.
            </p>
          </div>
          <button
            type="button"
            onClick={onDeleteAccount}
            className="btn-danger"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
