import { Injectable } from '@angular/core';
import { OrderPosition, Position } from '@app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  public positionList: OrderPosition[] = [];
  public total: number = 0;

  public add(position: Position): void {
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

  public remove(orderPosition: OrderPosition): void {
    const idx =  this.positionList.findIndex((position: OrderPosition): boolean => position._id === orderPosition._id);
    this.positionList.splice(idx, 1);
    this.computePrice();
  }

  public clear(): void {
    this.positionList = [];
    this.total = 0;
  }

  private computePrice(): void {
    this.total = this.positionList.reduce((total: number, item: OrderPosition): number => {
      return item.quantity ? total += item.quantity * item.cost : total;
    }, 0);
  }
}
