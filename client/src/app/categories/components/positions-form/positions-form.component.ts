import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { MaterializeModalInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  public positions: Position[] = [];
  public loading: boolean = false;
  public positionId: string | undefined | null;
  public modal: MaterializeModalInstance;
  public form: FormGroup;

  @Input() categoryId: string;

  @ViewChild('modal') modalRef: ElementRef;

  constructor(
    private positionService: PositionsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe((positions: Position[]) => {
      this.positions = positions;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
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

  public onCancel(): void {
    this.modal.close();
  }

  public onSubmit(): void {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({
        name: '',
        cost: 1,
      });
      this.form.enable();
    }

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionService.update(newPosition).subscribe(
        (position: Position): void => {
          const idx: number = this.positions.findIndex((p: Position): boolean => p._id === position._id);
          this.positions[idx] = position;
          MaterializeService.toast('Changes saved');
        },
        (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
        completed,
      );
    } else {
      this.positionService.create(newPosition).subscribe(
        (position: Position): void => {
          MaterializeService.toast('Position was created');
          this.positions.push(position);
        },
        (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
        completed,
      );
    }
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

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }
}
