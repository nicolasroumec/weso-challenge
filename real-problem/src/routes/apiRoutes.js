import { Router } from 'express';
import { getHistoricalRate } from '../controllers/apiController.js';

export const apiRouter = Router();

apiRouter.get('/historical/:date', getHistoricalRate);
