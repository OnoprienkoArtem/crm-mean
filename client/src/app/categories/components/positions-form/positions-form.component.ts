import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  public modal: MaterializeModalInstance;

  @Input() categoryId: string

  @ViewChild('modal') modalRef: ElementRef;

  constructor(private positionService: PositionsService) { }

  ngOnInit(): void {
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
    this.modal.open();
  }

  public onAddPosition(): void {
    this.modal.open();
  }

  public onCancel(): void {
    this.modal.close();
  }
}
