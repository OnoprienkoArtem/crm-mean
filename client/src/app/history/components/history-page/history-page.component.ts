import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public isFilterVisible: boolean = false;

  private tooltip: MaterializeInstance;

  @ViewChild('tooltip') tooltipRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterializeService.initTooltip(this.tooltipRef);
  }

}
