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

export async function create(req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id,
    }).save();

    res.status(201).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function remove(req, res) {
  try {
    await Position.remove({
      _id: req.params.id,
    });

    res.status(200).json({
      message: 'Position has been deleted.',
    });
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
