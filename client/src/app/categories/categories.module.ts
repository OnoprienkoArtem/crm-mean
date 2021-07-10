import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from '@app/categories/categories-routing.module';

import { CategoriesPageComponent, CategoriesNewComponent, PositionsFormComponent } from '@app/categories/components';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesNewComponent,
    PositionsFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CategoriesModule {
}
