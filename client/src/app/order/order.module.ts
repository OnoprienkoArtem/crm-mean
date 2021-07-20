import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from '@app/order/order-routing.module';

import { OrderPageComponent, OrderCategoriesComponent, OredrPositionsComponent } from '@app/order/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    OrderPageComponent,
    OrderCategoriesComponent,
    OredrPositionsComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ]
})
export class OrderModule { }
