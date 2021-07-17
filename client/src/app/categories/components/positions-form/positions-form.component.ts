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
import { PositionsService } from '@app/core/services';
import { Position } from '@app/shared/interfaces';
import { MaterializeModalInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

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

  constructor(private positionService: PositionsService) { }

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



    if (this.positionId) {
      this.positionService.update(newPosition).subscribe(
        (position: Position): void => {
          MaterializeService.toast('Changes saved');
        },
        (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
        (): void => {
          this.modal.close();
          this.form.reset({
            name: '',
            cost: 1,
          });
          this.form.enable();
        },
      );
    } else {
      this.positionService.create(newPosition).subscribe(
        (position: Position): void => {
          MaterializeService.toast('Position was created');
          this.positions.push(position);
        },
        (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
        (): void => {
          this.modal.close();
          this.form.reset({
            name: '',
            cost: 1,
          });
          this.form.enable();
        },
      );
    }
  }

  public onDeletePosition(position: Position): void {

  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }
}
