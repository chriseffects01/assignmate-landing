"use client";

import { useState, useEffect } from "react";
import ChartMain from "./chart/ChartMain";
import ChartBar from "./chart/ChartBar";
import { getChartDats } from "@/src/lib/chartData";

const filters: Filter[] = ["7D", "30D", "Semester"];
type Filter = "7D" | "30D" | "Semester";

export default function DashboardProgressChart() {
  const [activeFilter, setActiveFilter] = useState<Filter>("7D");

  const [data, setData] = useState<number[]>([]);

  // persist filter

  useEffect(() => {
    const saved = localStorage.getItem("chart-filter");
    if (saved) {
      setActiveFilter(saved as any);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chart-filter", activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setData(getChartDats(activeFilter));
  }, [activeFilter]);

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
        {/* <ChartMain
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        /> */}

        <div className="chart">
          {data.map((value, i) => (
            <ChartBar key={i} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
