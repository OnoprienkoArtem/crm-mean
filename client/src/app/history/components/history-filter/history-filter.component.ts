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
  public isValid: boolean = true;

  private start: MaterializeDatepicker;
  private end: MaterializeDatepicker;

  @Output() onFilter = new EventEmitter<Filter>();

  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.start = MaterializeService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterializeService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  public validate(): void {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }

  public submitFilter(): void {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    this.onFilter.emit(filter);
  }

}
