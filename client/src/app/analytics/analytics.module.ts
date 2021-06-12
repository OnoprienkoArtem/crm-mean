import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from '@app/analytics';

import { AnalyticsPageComponent } from '@app/analytics/components';


@NgModule({
  declarations: [
    AnalyticsPageComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
