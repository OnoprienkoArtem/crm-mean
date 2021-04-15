import express from 'express';
import {getByCategoryId, remove, create, update} from '../controllers/position.js';

const router = express.Router();

router.get('/:categoryId', getByCategoryId);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);


export default router;
