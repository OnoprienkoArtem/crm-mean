import express from 'express';
import passport from 'passport';

import {getByCategoryId, remove, create, update} from '../controllers/position.js';


const router = express.Router();

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), remove);
router.patch('/:id', passport.authenticate('jwt', {session: false}), update);

export default router;
