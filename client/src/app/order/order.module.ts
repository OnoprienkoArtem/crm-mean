import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderRoutingModule } from '@app/order/order-routing.module';

import { OrderCategoriesComponent, OredrPositionsComponent } from '@app/order/components';
import { OrderPageComponent } from '@app/order/components/order-page/order-page.component';
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
    FormsModule,
  ]
})
export class OrderModule { }
