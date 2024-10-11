import { Router } from 'express';
import { getLatestRate, getHistoricalRate } from '../controllers/apiController.js';

export const apiRouter = Router();

apiRouter.get('/latest', getLatestRate);
apiRouter.get('/historical/:date', getHistoricalRate);
