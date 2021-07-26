import { OrderPosition } from '@app/shared/interfaces';

export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}
