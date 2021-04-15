import express from 'express';
import {getAll, getById, remove, create, update} from '../controllers/category.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', remove);
router.post('/', create);
router.patch('/:id', update);


export default router;



