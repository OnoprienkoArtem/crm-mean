import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Filter } from '@app/shared/interfaces';
import { MaterializeDatepicker, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: [ './history-filter.component.scss' ]
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  public order: number;

  private start: MaterializeDatepicker;

  @Output() onFilter = new EventEmitter<Filter>();

  @ViewChild('start') startRef: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.start = MaterializeService.initDatepicker(this.startRef, this.validate.bind(this));
  }

  ngOnDestroy(): void {
    this.start.destroy();
  }

  public validate(): void {

  }

  public submitFilter(): void {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    this.onFilter.emit(filter);
  }

}
