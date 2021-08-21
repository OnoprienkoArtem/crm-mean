import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PositionsService } from '@app/core/services';
import { ModalConfirmComponent } from '@app/shared/components';
import { Message, Position } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {
  public positions: Position[] = [];
  public loading: boolean = false;
  public positionId: string | undefined | null;

  @Input() categoryId: string;

  constructor(
    private positionService: PositionsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe((positions: Position[]) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  public onSelectPosition(position: Position): void {


    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    });

    this.modal.open();
    MaterializeService.updateTextInputs();
  }

  public onAddPosition(): void {


    this.positionId = null;
    this.form.reset();
    this.modal.open();
    MaterializeService.updateTextInputs();
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
        const idx: number = this.positions.findIndex((p: Position): boolean => p._id === position._id);
        this.positions.splice(idx, 1);
      }),
      tap((message: Message): void => MaterializeService.toast(message.message)),
      catchError((error: HttpErrorResponse): Observable<HttpErrorResponse> => {
        MaterializeService.toast(error.error.message);
        return throwError(error.error.message);
      }),
    ).subscribe();
  }
}
