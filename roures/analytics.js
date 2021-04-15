import express from 'express';
import {overview, analytics} from '../controllers/analytics.js';

const router = express.Router();

router.get('/overview', overview);
router.get('/analytics', analytics);

export default router;
