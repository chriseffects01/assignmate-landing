"use client";

import { useState } from "react";

export default function Navbar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-left">
        <button
          className={`sidebar-toggle-btn ${isSidebarOpen ? "" : "sidebar-open"}`}
          onClick={() => {
            toggleSidebar();
          }}
          type="button"
        >
          &#9776;
        </button>
        <div className="dashboard-profile-picture">
          <div className="dashboard-profile-pic-inner"></div>
        </div>
        <p className="dashboard-user-name">Chris</p>
        <p className="dashboard-nav-logo"> | AssignMate</p>
      </div>

      <div className="dashboard-navbar-center">
        <div className="dashboard-search-wrapper">
          <input
            type="text"
            placeholder="Search assignments..."
            name="nav-input"
            className="dashboard-search"
            onFocus={() => {
              setIsSearchOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsSearchOpen(false);
              }, 330);
            }}
          />

          {isSearchOpen && (
            <div className="dashboard-search-dropdown">
              <p className="dashboard-search-empty-text">
                No recent assignments
              </p>
              <p className="dashboard-search-empty-text">
                Want to get started?
              </p>

              <button type="button" className="dashboard-search-start-button">
                Start New
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-navbar-right">
        <button type="button" className="dashboard-new-button">
          + New
        </button>

        <div className="dashboard-avatar">CA</div>
      </div>
    </header>
  );
}
