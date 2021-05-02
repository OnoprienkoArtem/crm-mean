import Category from '../models/category.js';
import { errorHandler } from '../utils/errorHandler.js';

export async function getAll(req, res) {
  try {
    const categories = await Category.find({
      user: req.user.id,
    });

    res.status(200).json(categories);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function getById(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    res.status(200).json(category);
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
