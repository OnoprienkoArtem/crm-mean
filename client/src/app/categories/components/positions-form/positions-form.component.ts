import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PositionsFormModalComponent } from '@app/categories/components/positions-form-modal';
import { PositionsService } from '@app/core/services';
import { ModalConfirmComponent } from '@app/shared/components';
import { Message, Position } from '@app/shared/interfaces';
import { MaterializeService } from '@app/shared/materialize/materialize.service';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {
  public positions: Observable<Position[]>;
  public loading: boolean = false;
  public positionId: string | undefined | null;

  private componentFactory: any;

  @Input() categoryId: string;

  constructor(
    private dialog: MatDialog,
    private positionService: PositionsService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    // this.loading = true;
    this.positions = this.positionService.fetch(this.categoryId);

    // this.positionService.fetch(this.categoryId).subscribe((positions: Position[]) => {
    //   this.positions = positions;
    //   this.loading = false;
    // });

    this.initializeDynamicComponent();
  }

  public onSelectPosition(position: Position): void {
    const dynamicComponent: PositionsFormModalComponent = this.componentFactory.instance;
    dynamicComponent.categoryId = this.categoryId;
    dynamicComponent.positionId = position._id;
    dynamicComponent.position = position;
    MaterializeService.updateTextInputs();
    dynamicComponent.modal.open();
  }

  public onAddPosition(): void {
    const dynamicComponent: PositionsFormModalComponent = this.componentFactory.instance;
    dynamicComponent.categoryId = this.categoryId;
    dynamicComponent.positionId = null;
    dynamicComponent.position = null;
    MaterializeService.updateTextInputs();
    dynamicComponent.modal.open();
  }

  public onDeletePosition(event: Event, position: Position): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        text: `Are you sure you want to delete the position ${position.name}?`,
      },
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap((): Observable<Message> => this.positionService.delete(position)),
      tap(() => {
        // const idx: number = this.positions.findIndex((p: Position): boolean => p._id === position._id);
        // this.positions.splice(idx, 1);
      }),
      tap((message: Message): void => MaterializeService.toast(message.message)),
      catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => {
        MaterializeService.toast(error.error.message);
        return throwError(error.error.message);
      }),
    ).subscribe();
  }

  private initializeDynamicComponent(): void {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(PositionsFormModalComponent);
    this.componentFactory = this.viewContainerRef.createComponent(resolver);
  }
}
