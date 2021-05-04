import Category from '../models/category.js';
import Position from '../models/position.js';
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

export async function remove(req, res) {
  try {
    await Category.remove({_id: req.params.id});
    await Position.remove({category: req.params.id});

    res.status(200).json({
      message: 'Category has been deleted.',
    });
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function create(req, res) {
  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  });

  try {
    await category.save();
    res.status(201).json(category);
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
