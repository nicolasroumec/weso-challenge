import mongoose from 'mongoose';

const currentRate = new mongoose.Schema({
  base: {
    type: String,
    required: true,
    default: 'USD'
  },
  rates: {
    type: Map,
    of: Number,
    required: true
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const historicalRate = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  base: {
    type: String,
    required: true,
    default: 'USD'
  },
  rates: {
    type: Map,
    of: Number,
    required: true
  }
});

historicalRate.index({ date: 1, base: 1 });

const CurrentRate = mongoose.model('CurrentRate', currentRate);
const HistoricalRate = mongoose.model('HistoricalRate', historicalRate);

export { CurrentRate, HistoricalRate };