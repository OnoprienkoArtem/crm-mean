import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-history-order-modal',
  templateUrl: './history-order-modal.component.html',
  styleUrls: [ './history-order-modal.component.scss' ]
})
export class HistoryOrderModalComponent implements OnDestroy, AfterViewInit {
  public modal: MaterializeInstance;

  @Input() selectedOrder: Order;

  @ViewChild('modal') modalRef: ElementRef;

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  public closeModal(): void {
    this.modal.close();
  }
}
