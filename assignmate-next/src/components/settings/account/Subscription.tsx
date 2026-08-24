'use client';

export default function SubscriptionSection() {
  return (
    <div className="settings-section">
      <div className="settings-section-header">
        <h2 className="settings-section-title">Subscription</h2>
        <span className="badge-coming-soon">Coming Soon</span>
      </div>

      <div className="placeholder-box">
        <div className="plan-info">
          <span className="plan-label">Current Plan</span>
          <span className="plan-name">Free Plan</span>
        </div>
        <p className="placeholder-text">
          Subscription management for pro tiers and usage plans will be
          available soon.
        </p>
      </div>
    </div>
  );
}
