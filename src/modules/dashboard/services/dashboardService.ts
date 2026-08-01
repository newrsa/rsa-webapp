import { AnalyticsSummary } from '../types/dashboard.types';

export const dashboardService = {
  async fetchAnalytics(): Promise<AnalyticsSummary> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      metrics: [
        { id: '1', title: 'Active Modules', value: '14', change: '+100%', isPositive: true },
        { id: '2', title: 'Bundle Health', value: '99.8%', change: '+0.4%', isPositive: true },
        { id: '3', title: 'Encapsulation Score', value: '100', change: 'Optimal', isPositive: true },
        { id: '4', title: 'Code Velocity', value: '4.2x', change: '+24%', isPositive: true },
      ],
      chartData: [
        { label: 'Jan', value: 40 },
        { label: 'Feb', value: 65 },
        { label: 'Mar', value: 85 },
        { label: 'Apr', value: 95 },
      ],
    };
  },
};
