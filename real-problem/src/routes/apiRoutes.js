import { Router } from 'express';
import { getLatestRate, getHistoricalRate } from '../controllers/apiController.js';

const router = Router();

router.get('/latest', getLatestRate);
router.get('/historical/:date', getHistoricalRate);

export default router;