import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order, OrderPosition } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  public selectedOrder: Order;

  private modal: MaterializeInstance;

  @Input() orders: Order[];

  @ViewChild('modal') modalRef: ElementRef;

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  public computeTotal(order: Order): number {
    return order.list.reduce((total: number, item: OrderPosition): number => {
      return total += item.quantity! * item.cost;
    }, 0)
  }

  public selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

  public closeModal(): void {
    this.modal.close();
  }
}
