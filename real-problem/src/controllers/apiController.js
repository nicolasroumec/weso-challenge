import { get } from 'https';

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
    const rate = await makeRequest('/latest.json?base=USD');
    res.json(rate);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}

export async function getHistoricalRate(req, res) {
  try {
    const { date } = req.params;
    const rate = await makeRequest(`/historical/${date}.json?base=USD`);
    res.json(rate);
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
}