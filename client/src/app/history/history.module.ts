import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistoryRoutingModule } from '@app/history/history-routing.module';

import { HistoryPageComponent, HistoryListComponent, HistoryFilterComponent } from '@app/history/components';
import { SharedModule } from '@app/shared';
import { HistoryOrderModalComponent } from './components/history-order-modal/history-order-modal.component';


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
