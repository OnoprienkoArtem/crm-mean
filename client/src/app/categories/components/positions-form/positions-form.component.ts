import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PositionsFormModalComponent } from '@app/categories/components/positions-form-modal';
import { PositionsService } from '@app/core/services';
import { ModalConfirmComponent } from '@app/shared/components';
import { Message, Position } from '@app/shared/interfaces';
import { MaterializeService } from '@app/shared/materialize/materialize.service';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: [ './positions-form.component.scss' ]
})
export class PositionsFormComponent implements OnInit {
  public loading: boolean = false;
  public positions$: Observable<Position[]>;

  private componentFactory: any;

  @Input() categoryId: string;

  constructor(
    private dialog: MatDialog,
    private positionService: PositionsService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit(): void {
    this.fetchPositions();
    this.initializeDynamicComponent();
  }

  public onSelectPosition(position: Position): void {
    this.adjustPositions(position);
  }

  public onAddPosition(): void {
    this.adjustPositions(null);
  }

  public onDeletePosition(event: Event, position: Position): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        text: `Are you sure you want to delete the position ${ position.name }?`,
      },
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap((): Observable<Message> => this.positionService.delete(position)),
      tap((): void => this.fetchPositions()),
      tap((message: Message): void => MaterializeService.toast(message.message)),
      catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => {
        MaterializeService.toast(error.error.message);
        return throwError(error.error.message);
      }),
    ).subscribe();
  }

  private adjustPositions(position: Position | null): void {
    const dynamicComponent: PositionsFormModalComponent = this.componentFactory.instance;
    dynamicComponent.categoryId = this.categoryId;
    dynamicComponent.positionId = position?._id;
    dynamicComponent.position = position;

    dynamicComponent.outputEvent.pipe(
      take(1),
      tap((): void => this.fetchPositions()),
    ).subscribe();

    MaterializeService.updateTextInputs();
    dynamicComponent.modal.open();
  }

  private fetchPositions(): void {
    this.loading = true;
    this.positions$ = this.positionService.fetch(this.categoryId).pipe(
      tap((): boolean => this.loading = false),
    );
  }

  private initializeDynamicComponent(): void {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(PositionsFormModalComponent);
    this.componentFactory = this.viewContainerRef.createComponent(resolver);
  }
}
