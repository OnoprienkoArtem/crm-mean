import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from '@app/history';

import { HistoryPageComponent } from '@app/history/components';



@NgModule({
  declarations: [
    HistoryPageComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
