import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { HistoryOrderModalComponent } from '@app/history/components/history-order-modal';
import { Order, OrderPosition } from '@app/shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: [ './history-list.component.scss' ]
})
export class HistoryListComponent implements OnInit {
  private componentFactory: any;

  @Input() orders: Order[];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit(): void {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(HistoryOrderModalComponent);
    this.componentFactory = this.viewContainerRef.createComponent(resolver);
  }

  public computeTotal(order: Order): number {
    return order.list.reduce((total: number, item: OrderPosition): number => {
      return total += item.quantity! * item.cost;
    }, 0);
  }

  public selectOrder(order: Order): void {
    const dynamicComponent: HistoryOrderModalComponent = this.componentFactory.instance;
    dynamicComponent.selectedOrder = order;
    dynamicComponent.modal.open();
  }
}
