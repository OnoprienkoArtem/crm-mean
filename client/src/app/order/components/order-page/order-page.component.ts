import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrderService } from '@app/core/services';
import { OrderCompleteModalComponent } from '@app/order/components/order-complete-modal';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: [ './order-page.component.scss' ]
})
export class OrderPageComponent implements OnInit {
  public isRoot: boolean;

  private componentFactory: any;

  constructor(
    public orderService: OrderService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit(): void {
    this.checkOnRoot();
    this.initializeDynamicComponent();
  }

  public openModal(): void {
    const dynamicComponent: OrderCompleteModalComponent = this.componentFactory.instance;
    dynamicComponent.modal.open();
  }

  private checkOnRoot(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  private initializeDynamicComponent(): void {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(OrderCompleteModalComponent);
    this.componentFactory = this.viewContainerRef.createComponent(resolver);
  }
}
