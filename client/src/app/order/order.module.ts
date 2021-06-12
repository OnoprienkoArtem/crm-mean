import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from '@app/order';

import { OrderPageComponent } from '@app/order/components';


@NgModule({
  declarations: [
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
