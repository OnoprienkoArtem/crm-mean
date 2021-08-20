import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '@app/core/services';
import { Analytics } from '@app/shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  public average: number;
  public pending: boolean = true;

  private analyticsSub: Subscription = new Subscription();

  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('orders') ordersRef: ElementRef;

  constructor(private analyticsService: AnalyticsService) {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  }

  ngAfterViewInit(): void {
    this.analyticsSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      this.average = data.average;
      this.createGainChart(data);
      this.createOrdersChart(data);
      this.pending = false;
    });
  }

  ngOnDestroy(): void {
    this.analyticsSub.unsubscribe();
  }

  private createGainChart(data: Analytics): void {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
    }

    gainConfig.labels = data.chart.map(item => item.label);
    gainConfig.data = data.chart.map(item => item.gain);

    const gainCtx = this.gainRef.nativeElement.getContext('2d');
    gainCtx.canvas.height = '300px';

    new Chart(gainCtx, AnalyticsPageComponent.createChartConfig(gainConfig));
  }

  private createOrdersChart(data: Analytics): void {
    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)',
    }

    orderConfig.labels = data.chart.map(item => item.label);
    orderConfig.data = data.chart.map(item => item.order);

    const orderCtx = this.ordersRef.nativeElement.getContext('2d');
    orderCtx.canvas.height = '300px';

    new Chart(orderCtx, AnalyticsPageComponent.createChartConfig(orderConfig));
  }

  private static createChartConfig({labels, data, label, color}: any): ChartConfiguration {
    return {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels,
        datasets: [
          {
            label, data,
            borderColor: color,
            stepped: false,
            fill: false,
          }
        ]
      }
    }
  }
}
