import StatCard from "@/src/components/dashboard/StatCard";
import { getDashboardStats } from "@/src/lib/dashboardStats";
import { useEffect, useState } from "react";
import { AssignmentStats } from "@/src/types/stat";
import { CACHE_KEY } from "@/src/var/var";

const DEFAULT_ZERO_STATS: AssignmentStats[] = [
  { label: "Drafts", value: 0 },
  { label: "Completed", value: 0 },
  { label: "Reports", value: 0 },
  { label: "Essays", value: 0 },
];

export default function DashboardStats() {
  const [stat, setStat] = useState<AssignmentStats[]>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          return DEFAULT_ZERO_STATS;
        }
      }
    }
  });

  useEffect(() => {
    async function load() {
      try {
        const realStats = await getDashboardStats();
        if (realStats) {
          const mappedStatsArr: AssignmentStats[] = Object.entries(
            realStats,
          ).map(([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value: value as number,
          }));
          setStat(mappedStatsArr);
          localStorage.setItem(CACHE_KEY, JSON.stringify(mappedStatsArr));
        }
        // console.log(mappedStatsArr);
      } catch (err) {
        console.error("Failed to get dashboard statistics:", err);
      }
    }
    load();
  }, []);

  // console.log(stat);

  return (
    <section className="dasboard-stats-grid">
      {stat?.map((stat: any) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </section>
  );
}
