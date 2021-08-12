import moment from 'moment';
import Order from '../models/Order.js';
import { errorHandler } from '../utils/errorHandler.js';

export async function overview(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort(1);
    const ordersMap = getOrdersMap(allOrders);
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];
    const yesterdayOrdersNumber = yesterdayOrders.length;
    const totalOrdersNumber = allOrders.length;
    const daysNumber = Object.keys(ordersMap).length;
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);
    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);
    const totalGain = calculatePrice(allOrders);

  } catch (e) {
    errorHandler(res, e);
  }
  res.status(200).json()
}

export async function analytics(req, res) {
  try {

  } catch (e) {
    errorHandler(res, e);
  }
  res.status(200).json()
}

function getOrdersMap(orders = []) {
  const daysOrders = {};

  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY');

    if (date === moment().format('DD.MM.YYYY')) {
      return;
    }

    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);
  });

  return daysOrders;
}

function calculatePrice(orders = []) {

}
