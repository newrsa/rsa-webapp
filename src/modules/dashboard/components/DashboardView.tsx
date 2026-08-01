import React from 'react';
import { Card } from '@/components';
import { useDashboard } from '../hooks/useDashboard';
import { StatsCard } from './StatsCard';

export const DashboardView: React.FC = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-400 text-sm animate-pulse">
        Loading dashboard analytics module...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Architectural Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics powered by <code className="text-indigo-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">src/modules/dashboard</code>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.metrics.map((metric) => (
          <StatsCard key={metric.id} metric={metric} />
        ))}
      </div>

      <Card title="Module Architecture Overview" subtitle="System Metrics & Scalability">
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <span>Modular Pattern Enforcement</span>
            <span className="font-mono text-emerald-400 text-xs font-semibold">Active (`modules/`)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <span>Encapsulation Boundary</span>
            <span className="font-mono text-indigo-400 text-xs font-semibold">Public Barrel Exports</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Layered Service Separation</span>
            <span className="font-mono text-cyan-400 text-xs font-semibold">Decoupled UI / Hooks</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
