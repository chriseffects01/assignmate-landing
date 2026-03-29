"use client";
import { useState } from "react";

type TimeFilter = "7D" | "30D" | "semester";

const filters: TimeFilter[] = ["7D", "30D", "semester"];

export default function DashboardProgressChart() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("7D");

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-header">
        <h2>Productivity Overview</h2>
        <div className="dashboard-chart-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`dashboard-chart-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-chart-placeholder">
        <p>Currently showing: {activeFilter}</p>
        <p>Bar chart will go here</p>
      </div>
    </section>
  );
}
