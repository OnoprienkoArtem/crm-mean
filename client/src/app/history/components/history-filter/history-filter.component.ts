import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filter } from '@app/shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: [ './history-filter.component.scss' ]
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter<Filter>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public submitFilter(): void {
    const filter: Filter = {};

    this.onFilter.emit(filter);
  }

}
