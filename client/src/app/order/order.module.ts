import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from '@app/order/order-routing.module';

import { OrderPageComponent, OredrCategoriesComponent, OredrPositionsComponent } from '@app/order/components';


@NgModule({
  declarations: [
    OrderPageComponent,
    OredrCategoriesComponent,
    OredrPositionsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
