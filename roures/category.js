import express from 'express';
import passport from 'passport';

import upload from '../middleware/upload.js';
import {getAll, getById, remove, create, update} from '../controllers/category.js';


const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), getAll);
router.get('/:id', getById);
router.delete('/:id', remove);
router.post('/', upload.single('image'), create);
router.patch('/:id', upload.single('image'), update);


export default router;



