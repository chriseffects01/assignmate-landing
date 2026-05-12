// import { useCountUp } from "@/src/hooks/useCountUp";/
import StatCard from "@/src/components/dashboard/StatCard";
import { getDashboardStats } from "@/src/lib/dashboardStats";
import { useEffect, useState } from "react";
import { AssignmentStats } from "@/src/types/stat";
import { LoadingBoundaryProvider } from "next/dist/client/components/layout-router";

export default function DashboardStats() {
  const [stat, setStat] = useState<AssignmentStats[]>([]);

  useEffect(() => {
    async function load() {
      const realStats = await getDashboardStats();
      if (realStats) {
        const mappedStatsArr: AssignmentStats[] = Object.entries(realStats).map(
          ([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value,
          }),
        );
        setStat(mappedStatsArr);
      }
      // console.log(mappedStatsArr);
    }
    load();
  }, []);
  // console.log(stat);

  return (
    <section className="dasboard-stats-grid">
      {stat.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </section>
  );
}
