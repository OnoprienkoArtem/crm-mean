import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from '@app/history/history-routing.module';

import { HistoryPageComponent, HistoryListComponent, HistoryFilterComponent } from '@app/history/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
  ]
})
export class HistoryModule { }
