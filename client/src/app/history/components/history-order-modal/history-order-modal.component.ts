import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order, OrderPosition } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-history-order-modal',
  templateUrl: './history-order-modal.component.html',
  styleUrls: ['./history-order-modal.component.scss']
})
export class HistoryOrderModalComponent implements OnInit, OnDestroy, AfterViewInit {

  public modal: MaterializeInstance;

  @Input() selectedOrder: Order;

  @ViewChild('modal') modalRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  public computeTotal(order: Order): number {
    return order.list.reduce((total: number, item: OrderPosition): number => {
      return total += item.quantity! * item.cost;
    }, 0)
  }

  public closeModal(): void {
    this.modal.close();
  }

}
