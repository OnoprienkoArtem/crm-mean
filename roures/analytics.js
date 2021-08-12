import express from 'express';
import {overview, analytics} from '../controllers/analytics.js';
import passport from 'passport';

const router = express.Router();

router.get('/overview', passport.authenticate('jwt', {session: false}), overview);
router.get('/analytics', passport.authenticate('jwt', {session: false}), analytics);

export default router;
