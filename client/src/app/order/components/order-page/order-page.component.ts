import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrderService, OrdersService } from '@app/core/services';
import { Order, OrderPosition } from '@app/shared/interfaces';
import { MaterializeModalInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: [ './order-page.component.scss' ]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public isRoot: boolean;
  public modal: MaterializeModalInstance;

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
    this.modal.close();

    const order: Order = {
      list: this.orderService.positionList.map((item: OrderPosition): OrderPosition => {
        delete item._id;
        return item;
      }),
    };

    this.ordersService.create(order).subscribe(
      (newOrder: Order): void => MaterializeService.toast(`Order #${ newOrder.order } was added.`),
      error => MaterializeService.toast(error.error.message),
      () => this.modal.close(),
    );
  }

  public removePosition(orderPosition: OrderPosition): void {
    this.orderService.remove(orderPosition);
  }
}
