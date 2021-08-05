import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrderService, OrdersService } from '@app/core/services';
import { Order, OrderPosition } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: [ './order-page.component.scss' ]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public isRoot: boolean;
  public modal: MaterializeInstance;
  public pending: boolean = false;

  private orderSub: Subscription;

  @ViewChild('modal') modalRef: ElementRef;

  constructor(
    private router: Router,
    public orderService: OrderService,
    public ordersService: OrdersService,
  ) {
  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy(): void {
    this.modal.destroy();
    this.orderSub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  public openModal(): void {
    this.modal.open();
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
