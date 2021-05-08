import Order from '../models/Order.js';
import {errorHandler} from '../utils/errorHandler.js';

export async function getAll(req, res) {
  const query = {
    user: req.user.id
  };

  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }

    query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    res.status(200).json(orders);
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
