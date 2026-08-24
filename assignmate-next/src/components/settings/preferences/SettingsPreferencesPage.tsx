'use client';

import Link from 'next/link';
import '@/src/styles/settings/settings-account.css';
import { ArrowLeft } from 'lucide-react';

export default function Preferences() {
  return (
    <div className="settings-container">
      <Link href={'/dashboard/settings'} className="settings-back-link">
        <ArrowLeft className="h-4 w-4" /> {'  '} Back to settings
      </Link>
      <div className="settings-form">
        {/* SECTION 1: Appearance */}
        <div className="settings-section">
          <div className="settings-section-header">
            <h2 className="settings-section-title">Appearance</h2>
            <span className="badge-coming-soon">Coming Soon</span>
          </div>

          <div className="placeholder-box">
            <div className="plan-info">
              <span className="plan-label">Theme Preference</span>
              <span className="plan-name">Dark Mode (Default)</span>
            </div>
            <p className="placeholder-text">
              Custom theme options (Light, System, and Accent colors) haven't
              been configured yet.
            </p>
          </div>
        </div>

        {/* SECTION 2: Notifications */}
        <div className="settings-section">
          <div className="settings-section-header">
            <h2 className="settings-section-title">Notifications</h2>
            <span className="badge-coming-soon">Coming Soon</span>
          </div>

          <div className="preferences-group">
            <div className="preference-toggle-item">
              <div>
                <h3 className="preference-title">Assignment Notifications</h3>
                <p className="preference-desc">
                  Get notified about assignment updates, deadlines, and exports.
                </p>
              </div>
              <input
                type="checkbox"
                disabled
                checked
                className="toggle-disabled"
              />
            </div>

            <div className="preference-toggle-item">
              <div>
                <h3 className="preference-title">Account & System Alerts</h3>
                <p className="preference-desc">
                  Receive updates regarding account security and system
                  features.
                </p>
              </div>
              <input
                type="checkbox"
                disabled
                checked
                className="toggle-disabled"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Workspace & Editor */}
        <div className="settings-section">
          <div className="settings-section-header">
            <h2 className="settings-section-title">Workspace & Editor</h2>
            <span className="badge-coming-soon">Coming Soon</span>
          </div>

          <div className="placeholder-box">
            <p className="placeholder-text">
              Default assignment templates, auto-save triggers, and custom
              editor behaviors will be configurable here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
