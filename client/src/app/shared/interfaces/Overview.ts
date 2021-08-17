export interface Overview {
  orders: OverviewItem;
  gain: OverviewItem;
}

interface OverviewItem {
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
}
