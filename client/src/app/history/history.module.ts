import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ]
})
export class HistoryModule { }
