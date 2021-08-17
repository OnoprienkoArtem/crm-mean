import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '@app/core/services';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {

  public average: number;
  public pending: boolean = true;

  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('orders') ordersRef: ElementRef;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
  }

}
