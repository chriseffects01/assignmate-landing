import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
export default function MyChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;
  });
}
