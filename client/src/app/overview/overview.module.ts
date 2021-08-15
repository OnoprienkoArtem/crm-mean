import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from '@app/overview/overview-routing.module';

import { OverviewPageComponent } from '@app/overview/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    OverviewPageComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
  ]
})
export class OverviewModule { }
