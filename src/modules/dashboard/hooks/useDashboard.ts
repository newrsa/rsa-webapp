import { useState, useEffect } from 'react';
import { AnalyticsSummary } from '../types/dashboard.types';
import { dashboardService } from '../services/dashboardService';

export function useDashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardService.fetchAnalytics().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}
