'use client';

import { useState, useEffect } from 'react';
import { getChartsData, Range, ChartDataPoint } from '@/src/lib/chartData';
import SimpleEmptyState from '../shared/SimpleEmptyState';

import ChartBar from './chart/ChartMain';

type Filter = '7D' | '30D' | 'Semester';
const filters: Filter[] = ['7D', '30D', 'Semester'];

export default function DashboardProgressChart() {
  const [activeFilter, setActiveFilter] = useState<Filter>('7D');
  const [currentData, setCurrentData] = useState<ChartDataPoint[] | null>(null);

  useEffect(() => {
    let isMounted: boolean = true;

    async function load() {
      try {
        const chartData = await getChartsData(activeFilter);
        if (isMounted) {
          setCurrentData(chartData);
        }
      } catch (e: any) {
        console.error('Could not load chart data', e);
        if (isMounted) {
          setCurrentData([]); // avoid leaving null on error
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [activeFilter]);

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-header">
        <h2>Productivity Overview</h2>
        <div className="dashboard-chart-filters">
          {filters.map(filter => (
            <button
              key={filter}
              type="button"
              className={`dashboard-chart-filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-chart-placeholder">
        <p className="chart-text-header">Currently showing: {activeFilter}</p>

        {currentData === null ? (
          <SimpleEmptyState message="No data yet" />
        ) : (
          <ChartBar currentData={currentData} />
        )}
      </div>
    </section>
  );
}
