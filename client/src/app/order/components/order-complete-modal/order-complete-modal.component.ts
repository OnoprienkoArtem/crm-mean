import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OrderService, OrdersService } from '@app/core/services';
import { Order, OrderPosition } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-complete-modal',
  templateUrl: './order-complete-modal.component.html',
  styleUrls: [ './order-complete-modal.component.scss' ]
})
export class OrderCompleteModalComponent implements OnInit, OnDestroy, AfterViewInit {
  public modal: MaterializeInstance;
  public pending: boolean = false;

  private orderSub: Subscription;

  @ViewChild('modal') modalRef: ElementRef;

  constructor(
    public orderService: OrderService,
    public ordersService: OrdersService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
    this.orderSub?.unsubscribe();
  }

  public cancel(): void {
    this.modal.close();
  }

  public submit(): void {
    this.pending = true;

    const order: Order = {
      list: this.orderService.positionList.map((item: OrderPosition): OrderPosition => {
        delete item._id;
        return item;
      }),
    };

    this.orderSub = this.ordersService.create(order).subscribe(
      (newOrder: Order): void => {
        MaterializeService.toast(`Order #${ newOrder.order } was added.`);
        this.orderService.clear();
      },
      error => MaterializeService.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      },
    );
  }

  public removePosition(orderPosition: OrderPosition): void {
    this.orderService.remove(orderPosition);
  }
}
