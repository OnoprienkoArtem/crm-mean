import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistoryRoutingModule } from '@app/history/history-routing.module';
import { SharedModule } from '@app/shared';
import {
  HistoryPageComponent,
  HistoryListComponent,
  HistoryFilterComponent,
  HistoryOrderModalComponent,
} from '@app/history/components';


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    HistoryOrderModalComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class HistoryModule { }
