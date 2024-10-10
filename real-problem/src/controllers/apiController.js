const https = require('https');

const app_id = 'b6b0e542666b440da6b60b04ce2643ac';
const url = 'https://openexchangerates.org/api';

function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    https.get(`${url}${endpoint}&app_id=${app_id}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

exports.getLatestRate = async (req, res) => {
  try {
    const rate = await makeRequest('/latest.json?base=USD');
    res.json(rate);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching latest rate' });
  }
};

exports.getHistoricalRate = async (req, res) => {
  try {
    const { date } = req.params;
    const rate = await makeRequest(`/historical/${date}.json?base=USD`);
    res.json(rate);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historical rate' });
  }
};
