import express from 'express';
import passport from 'passport';

import upload from '../middleware/upload.js';
import {getAll, getById, remove, create, update} from '../controllers/category.js';


const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}), remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), update);


export default router;



