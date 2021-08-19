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

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)',
    }

    this.analyticsSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';

      Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
      new Chart(gainCtx, AnalyticsPageComponent.createChartConfig(gainConfig));

      this.pending = false;
    });
  }

  ngOnDestroy(): void {
    this.analyticsSub.unsubscribe();
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
