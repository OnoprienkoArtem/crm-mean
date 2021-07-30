import { Injectable } from '@angular/core';
import { Order, OrderPosition, Position } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  public positionList: OrderPosition[] = [];
  public total: number = 0;

  constructor() {
  }

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id,
    });
    const candidate = this.positionList.find((position: OrderPosition): boolean => {
      return position._id === orderPosition._id;
    });

    if (candidate && candidate.quantity && orderPosition.quantity) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.positionList.push(orderPosition);
    }
    this.computePrice();
  }

  public remove(orderPosition: OrderPosition) {
    const idx =  this.positionList.findIndex((position: OrderPosition): boolean => position._id === orderPosition._id);
    this.positionList.splice(idx, 1);
    this.computePrice();
  }

  public clear() {
    this.positionList = [];
    this.total = 0;
  }

  private computePrice(): void {
    this.total = this.positionList.reduce((total: number, item: OrderPosition): number => {
      return item.quantity ? total += item.quantity * item.cost : total;
    }, 0);
  }
}
