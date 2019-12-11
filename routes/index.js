const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello from index')
});

module.exports = router;

async function callApi(apiToken) {
  apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min'
  try {    
    return getTimeSeries(apiUrl, apiToken)
    
  } catch (error) {
    console.error(error);
  }
  
  async function getTimeSeries(url, apiToken) {
    requestUrl = url + '&apikey=' + apiToken;
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
}
