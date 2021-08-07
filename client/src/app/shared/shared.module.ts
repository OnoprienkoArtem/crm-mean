import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent, ModalConfirmComponent } from '@app/shared/components';
import { ComputeTotalPipe } from '@app/shared/pipes';


@NgModule({
  declarations: [
    LoaderComponent,
    ModalConfirmComponent,
    ComputeTotalPipe,
  ],
  exports: [
    LoaderComponent,
    ModalConfirmComponent,
    ComputeTotalPipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
