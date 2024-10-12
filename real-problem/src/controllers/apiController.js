import { get } from 'https';
import { getDb } from '../dbConnection.js';

const app_id = 'b6b0e542666b440da6b60b04ce2643ac'; 
const url = 'https://openexchangerates.org/api';

function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    get(`${url}${endpoint}&app_id=${app_id}`, (res) => {
      let data = '';
      res.on('data', (r) => {
        data += r;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

export async function getLatestRate(req, res) {
  try {
    const data = await makeRequest('/latest.json?base=USD');
    const db = getDb();
    
    await db.collection('currentRates').updateOne(
      { base: data.base },
      { 
        $set: {
          rates: data.rates,
          lastUpdated: new Date(data.timestamp * 1000)
        }
      },
      { upsert: true }
    );

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error' });
  }
}

export async function getHistoricalRate(req, res) {
  try {
    const { date } = req.params;
    const queryDate = new Date(date);
    const db = getDb();
    
    let historicalRate = await db.collection('historicalRates').findOne({ date: queryDate });
    
    if (!historicalRate) {
      const data = await makeRequest(`/historical/${date}.json?base=USD`);
      historicalRate = {
        date: queryDate,
        base: data.base,
        rates: data.rates
      };
      await db.collection('historicalRates').insertOne(historicalRate);
    }

    res.json(historicalRate);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Error' });
  }
}