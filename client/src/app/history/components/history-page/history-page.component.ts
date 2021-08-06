import { EventData } from '@angular/cdk/testing';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '@app/core/services';
import { Filter, Order } from '@app/shared/interfaces';
import { MaterializeInstance, MaterializeService } from '@app/shared/materialize/materialize.service';
import { Subscription } from 'rxjs';

const STEP: number = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public isFilterVisible: boolean = false;
  public offset: number = 0;
  public limit: number = STEP;
  public orders: Order[] = [];
  public loading: boolean = false;
  public reloading: boolean = false;
  public noMoreOrders: boolean = false;

  private tooltip: MaterializeInstance;
  private orderSubscription: Subscription;

  @ViewChild('tooltip') tooltipRef: ElementRef;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.orderSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterializeService.initTooltip(this.tooltipRef);
  }

  public applyFilter(filter: Filter): void {

  }

  public loadMore(): void {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  private fetch(): void {
    const params = {
      offset: this.offset,
      limit: this.limit,
    }
    this.orderSubscription = this.ordersService.fetch(params).subscribe((orders: Order[]): void => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }
}
