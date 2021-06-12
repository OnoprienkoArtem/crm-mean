import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryPageComponent } from '@app/history/components';


const routes: Routes = [
  {
    path: '',
    component: HistoryPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
