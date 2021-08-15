export interface Analytics {
  orders: AnalyticsItem;
  gain: AnalyticsItem;
}

interface AnalyticsItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}
