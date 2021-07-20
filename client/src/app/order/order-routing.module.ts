import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderPageComponent, OrderCategoriesComponent, OredrPositionsComponent } from '@app/order/components';

const routes: Routes = [
  {
    path: '',
    component: OrderPageComponent,
    children: [
      {
        path: '',
        component: OrderCategoriesComponent,
      },
      {
        path: ':id',
        component: OredrPositionsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
