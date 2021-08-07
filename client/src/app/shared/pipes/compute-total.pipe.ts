import { Pipe, PipeTransform } from '@angular/core';
import { Order, OrderPosition } from '@app/shared/interfaces';

@Pipe({
  name: 'computeTotal'
})
export class ComputeTotalPipe implements PipeTransform {

  transform(order: Order): number {
    return order.list.reduce((total: number, item: OrderPosition): number => {
      return total += item.quantity! * item.cost;
    }, 0);
  }
}
