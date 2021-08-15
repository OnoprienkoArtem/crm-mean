import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '@app/core/services';
import { Analytics } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  public overviewData$: Observable<Analytics>;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.overviewData$ = this.analyticsService.getOverview();
  }

}
