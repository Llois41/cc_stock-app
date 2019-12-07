const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

const baseUrl = 'https://www.alphavantage.co/query?'

router.use(cors())

router.get('/:equity', (req, res) => {
    console.log('Server')
    let equityParam = 'symbol=' + req.params.equity;
    let functionParam = 'function=TIME_SERIES_INTRADAY';
    let interval = 'interval=30min'
    let datatypeParam = 'datatype=json'
    const apiUrl = baseUrl + functionParam + '&' + equityParam + '&' + interval + '&' + datatypeParam
    callApi(apiUrl, 'FDJ2MV6W3X1URKR2')
    .then(data => res.send(data))
    //.then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error))
});

module.exports = router;

async function callApi(apiUrl, apiToken) {
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
    return await response.json();
  }
}
