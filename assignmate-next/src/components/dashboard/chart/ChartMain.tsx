import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { AssignmentStats } from "@/src/types/stat";
import { getDashboardStats } from "@/src/lib/dashboardStats";

export default function MyChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const [stat, setStat] = useState<AssignmentStats[]>([]);
  useEffect(() => {
    const realStats = getDashboardStats();
    if (realStats) {
      const mappedStatsArr: AssignmentStats[] = Object.entries(realStats).map(
        ([key, value]) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value,
        }),
      );
      setStat(mappedStatsArr);
      // console.log(mappedStatsArr);
    }

    if (!chartRef.current) return; //guard against null
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: stat.map((item) => item.label),
        datasets: [
          {
            label: "Document Stats",
            data: stat.map((item) => item.value),
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255,99,132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: "rgba(75, 192, 192, 1)",
            borderRadius: 6,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return chartInstance.destroy();
  }, []);

  return <canvas ref={chartRef} />;
}
