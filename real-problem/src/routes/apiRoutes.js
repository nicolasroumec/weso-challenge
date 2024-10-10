const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/latest', apiController.getLatestRate);
router.get('/historical/:date', apiController.getHistoricalRate);

module.exports = router;