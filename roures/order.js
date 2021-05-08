import express from 'express';
import passport from 'passport';

import {getAll, create} from '../controllers/order.js';


const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), getAll);
router.post('/', passport.authenticate('jwt', {session: false}), create);

export default router;
