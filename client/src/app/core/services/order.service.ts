import { Injectable } from '@angular/core';
import { OrderPosition, Position } from '@app/shared/interfaces';

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



  }

  remove() {

  }

  clear() {

  }
}
