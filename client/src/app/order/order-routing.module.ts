import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderCategoriesComponent, OredrPositionsComponent } from '@app/order/components';
import { OrderPageComponent } from '@app/order/components/order-page/order-page.component';

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
