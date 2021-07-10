import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent, ModalConfirmComponent } from '@app/shared/components';


@NgModule({
  declarations: [
    LoaderComponent,
    ModalConfirmComponent,
  ],
  exports: [
    LoaderComponent,
    ModalConfirmComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
