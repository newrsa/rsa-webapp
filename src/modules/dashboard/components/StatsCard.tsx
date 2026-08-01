import React from 'react';
import { Card } from '@/components';
import { MetricCardData } from '../types/dashboard.types';

export const StatsCard: React.FC<{ metric: MetricCardData }> = ({ metric }) => {
  return (
    <Card className="hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start">
        <p className="text-xs text-slate-400 font-medium">{metric.title}</p>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {metric.change}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-100 mt-2 tracking-tight">{metric.value}</p>
    </Card>
  );
};
