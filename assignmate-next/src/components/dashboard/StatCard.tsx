"use client";

import { useCountUp } from "@/src/hooks/useCountUp";

type Props = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: Props) {
  const animatedValue = useCountUp(value);

  return (
    <div className="dashboard-stat-grid">
      <p className="dashboard-stat-label">{label}</p>
      <h2 className="dashboard-stat-value">
        {animatedValue.toString().padStart(2, "0")}
      </h2>
    </div>
  );
}
