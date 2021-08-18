import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from '@app/analytics/analytics-routing.module';

import { AnalyticsPageComponent } from '@app/analytics/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    AnalyticsPageComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule,
  ]
})
export class AnalyticsModule { }
