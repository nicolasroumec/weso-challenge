import { get } from 'https';
import { getDb } from '../dbConnection.js';
import { Rate, rateCollection } from '../models/rate.js';

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

export async function getHistoricalRate(req, res) {
  try {
    const { date } = req.params;
    const db = getDb();
    
    if (!db) {
      throw new Error("No DB connection");
    }
    
    let rateDoc = await db.collection(rateCollection).findOne({ date: date });
    
    if (!rateDoc) {
      const data = await makeRequest(`/historical/${date}.json?base=USD`);
      const rate = new Rate(date, data.base, data.rates);
      await db.collection(rateCollection).insertOne(rate.toDocument());
      rateDoc = rate.toDocument();
    }

    res.json(Rate.fromDocument(rateDoc));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error' });
  }
}