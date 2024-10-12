import { get } from 'https';
import { getDb } from '../dbConnection.js';
import { Rate, rateCollection } from '../models/rate.js';
import dotenv from 'dotenv';

dotenv.config();

const app_id = process.env.APP_ID;
const url = 'https://openexchangerates.org/api';

if (!app_id) {
  console.error("APP_ID is not defined in the environment variables");
  process.exit(1);
}

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
  let db;
  try {
    db = getDb();
    if (!db) {
      throw new Error("No connection");
    }

    const { date } = req.params;
    
    let rateDoc = await db.collection(rateCollection).findOne({ date: date });
    
    if (!rateDoc) {
      console.log("Data not found in DB, fetching from API");
      const apiData = await makeRequest(`/historical/${date}.json?base=USD`);
      const rate = new Rate(date, apiData.base, apiData.rates);
      
      await db.collection(rateCollection).insertOne(rate.toDocument());
      console.log("Data saved to DB");
      
      rateDoc = rate.toDocument();
    } else {
      console.log("Data found in DB");
    }

    res.json(Rate.fromDocument(rateDoc));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message,
      message: "Database disconnected."
    });
  }
}