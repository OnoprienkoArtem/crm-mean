import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionsService } from '@app/core/services';
import { Position } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-positions-form-modal',
  templateUrl: './positions-form-modal.component.html',
  styleUrls: ['./positions-form-modal.component.scss']
})
export class PositionsFormModalComponent implements OnInit, AfterViewInit, OnDestroy {
  public form: FormGroup;
  public modal: MaterializeInstance;

  @Output() outputEvent: EventEmitter<Position> = new EventEmitter<Position>();

  @Input() categoryId: string;
  @Input() positionId: string | undefined | null;
  @Input() set position(position: Position | null) {
    this.form.patchValue({
      name: position?.name,
      cost: position?.cost,
    });
  };

  @ViewChild('modal') modalRef: ElementRef;

  constructor(private positionService: PositionsService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  public onCancel(): void {
    this.modal.close();
    this.form.reset();
  }

  public onSubmit(): void {
    console.log('submit');
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
      this.positionService.update(newPosition).pipe(
        take(1),
      ).subscribe(
        (position: Position): void => {
          this.outputEvent.emit(position);
          console.log('');
          MaterializeService.toast('Changes saved');
        },
        (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
        completed,
      );
    } else {
      this.positionService.create(newPosition).pipe(
        take(1),
      ).subscribe(
        (position: Position): void => {
          this.outputEvent.emit(position);
          MaterializeService.toast('Position was created');
        },
        (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
        completed,
      );
    }
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }
}
