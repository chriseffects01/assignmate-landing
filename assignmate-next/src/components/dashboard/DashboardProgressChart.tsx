"use client";

import { useState, useEffect } from "react";
import { productivityData } from "@/src/lib/chartMain";
import { getChartDats } from "@/src/lib/chartData";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const filters: Filter[] = ["7D", "30D", "Semester"];
type Filter = "7D" | "30D" | "Semester";

export default function DashboardProgressChart() {
  const [activeFilter, setActiveFilter] = useState<Filter>("7D");

  const [data, setData] = useState<number[]>([]);
  const currentData = productivityData[activeFilter];
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
    async function load() {
      const chartData = await getChartDats(activeFilter);
      setData(chartData);
    }
    // console.log(data);
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
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="reports" stackId="a" fill="#f59e0b" />

              <Bar dataKey="reports" stackId="a" fill="#2b82f6" />

              <Bar dataKey="essays" stackId="a" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
