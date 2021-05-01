import Position from '../models/position.js';
import { errorHandler } from '../utils/errorHandler.js';

export async function getByCategoryId(req, res) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user.id,
    });

    res.status(200).json(positions);
  } catch (e) {
    errorHandler(res, e);
  }
}

export function remove(req, res) {
  try {

  } catch (e) {
    errorHandler(res, e);
  }
}

export function create(req, res) {
  try {

  } catch (e) {
    errorHandler(res, e);
  }
}

export function update(req, res) {
  try {

  } catch (e) {
    errorHandler(res, e);
  }
}
