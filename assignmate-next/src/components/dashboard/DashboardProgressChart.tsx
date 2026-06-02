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
              {/* <CartesianGrid vertical={false} stroke="#051636" /> */}

              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip
                contentStyle={{
                  border: "none",
                  backgroundColor: "#0f172a",

                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              />
              <Legend />

              <Bar
                dataKey="drafts"
                stackId="a"
                // fill="#93c5fd"
                fill="#dbeafe"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="reports"
                stackId="a"
                // fill="#60a5fa"
                fill="#93c5fd"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="essays"
                stackId="a"
                // fill="#3b82f6"
                fill="#60a5fa"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="completed"
                stackId="a"
                // fill="#1d4ed8"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
