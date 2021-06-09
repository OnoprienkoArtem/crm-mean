import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewPageComponent } from '@app/overview/components/overview-page';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
