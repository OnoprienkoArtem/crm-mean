import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '@app/core/services';
import { Analytics } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;

  public overviewData$: Observable<Analytics>;
  public tapTarget: MaterializeInstance;


  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.overviewData$ = this.analyticsService.getOverview();
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterializeService.initTapTarget(this.tapTargetRef);
  }

  public openInfo(): void {
    this.tapTarget.open();
  }
}
