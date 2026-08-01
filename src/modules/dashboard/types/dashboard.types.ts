export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface AnalyticsSummary {
  metrics: MetricCardData[];
  chartData: { label: string; value: number }[];
}
