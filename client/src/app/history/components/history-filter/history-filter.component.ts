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
import { MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: [ './history-filter.component.scss' ]
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  public order: number;

  @Output() onFilter = new EventEmitter<Filter>();

  @ViewChild('start') startRef: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  public submitFilter(): void {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    this.onFilter.emit(filter);
  }

}
