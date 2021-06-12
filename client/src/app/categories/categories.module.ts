import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from '@app/categories';

import { CategoriesPageComponent } from '@app/categories/components';


@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
