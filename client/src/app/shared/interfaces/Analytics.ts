export interface Analytics {
  average: number;
  chart: AnalyticsChartItem;
}

export interface AnalyticsChartItem {
  gain: number;
  order: number;
  label: string;
}
