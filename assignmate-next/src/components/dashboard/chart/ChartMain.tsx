import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "@/src/styles/charts/charts.css";

// 🌌 Custom Glassmorphic Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const colorMap: { [key: string]: string } = {
      "url(#completedGrad)": "#00e676",
      "url(#draftsGrad)": "#ffb03a",
      "url(#essaysGrad)": "#00c3ff",
      "url(#reportsGrad)": "#9d4edd",
    };
    return (
      <div className="chart-glass-tooltip">
        <p className="tooltip-label">📅 {label}</p>
        <div className="tooltip-divider"></div>
        {payload.map((item: any, index: number) => {
          const dotColor = colorMap[item.color] || item.color;

          return (
            <p key={index} className="tooltip-item" style={{ color: dotColor }}>
              <span
                className="tooltip-dot"
                style={{ backgroundColor: dotColor }}
              ></span>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)} :{" "}
              <strong>{item.value}</strong>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function ChartBar({ currentData }: { currentData: any[] }) {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={currentData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* 🔑 Injecting Neon Core Gradients via SVG Definitions */}
          <defs>
            <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00e676" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#00e676" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="draftsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffb03a" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#ffb03a" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="essaysGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c3ff" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#00c3ff" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="reportsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9d4edd" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#9d4edd" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Clean Axis Controls */}
          <XAxis
            dataKey="name"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Custom Interactive Tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.04)", radius: 8 }}
          />

          <Legend
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "13px",
              color: "#fff",
            }}
          />

          {/* 📊 Stacked Bars with Graduated Fills */}
          {/* Note: Only the top layer bar needs the corner radius */}
          <Bar
            dataKey="completed"
            stackId="a"
            fill="url(#completedGrad)"
            radius={[0, 0, 0, 0]}
            className="barchart"
          />
          <Bar
            dataKey="drafts"
            stackId="a"
            fill="url(#draftsGrad)"
            radius={[0, 0, 0, 0]}
            className="barchart"
          />
          <Bar
            dataKey="essays"
            stackId="a"
            fill="url(#essaysGrad)"
            radius={[0, 0, 0, 0]}
            className="barchart"
          />
          <Bar
            dataKey="reports"
            stackId="a"
            fill="url(#reportsGrad)"
            radius={[6, 6, 0, 0]} // Forces a beautifully rounded crown cap on the entire stack!
            className="barchart"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
