import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from '@app/categories/categories-routing.module';

import { CategoriesPageComponent, CategoriesNewComponent } from '@app/categories/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesNewComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule {
}
