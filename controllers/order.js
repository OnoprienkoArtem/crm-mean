import Order from '../models/Order.js';
import {errorHandler} from '../utils/errorHandler.js';

export function getAll(req, res) {
  try {

  } catch (e) {
    errorHandler(res, e);
  }
}

export async function create(req, res) {
  try {
    const lastOrder = await Order
      .findOne({user: req.user.id})
      .sort({date: -1});

    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1
    }).save();

    res.status(201).json(order);
  } catch (e) {
    errorHandler(res, e);
  }
}
