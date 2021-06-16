import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from '@app/categories/categories-routing.module';

import { CategoriesPageComponent } from '@app/categories/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
