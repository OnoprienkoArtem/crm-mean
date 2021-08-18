import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '@app/core/services';
import { Analytics } from '@app/shared/interfaces';
import { Subscription } from 'rxjs';

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

  constructor(private analyticsService: AnalyticsService) { }

  ngAfterViewInit(): void {
    this.analyticsSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      this.average = data.average;


      this.pending = false;
    });
  }

  ngOnDestroy(): void {
    this.analyticsSub.unsubscribe();
  }


}
