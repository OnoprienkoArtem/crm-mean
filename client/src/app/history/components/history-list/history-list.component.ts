import { Component, Input, OnInit } from '@angular/core';
import { Order, OrderPosition } from '@app/shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  @Input() orders: Order[];

  constructor() { }

  ngOnInit(): void {
  }

  public computeTotal(order: Order): number {
    return order.list.reduce((total: number, item: OrderPosition): number => {
      return total += item.quantity! * item.cost;
    }, 0)
  }

}
