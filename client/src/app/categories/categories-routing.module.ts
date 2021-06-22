import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesNewComponent, CategoriesPageComponent } from '@app/categories/components';


const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
  },
  {
    path: 'new',
    component: CategoriesNewComponent,
  },
  {
    path: ':id',
    component: CategoriesNewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
