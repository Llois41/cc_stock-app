const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

const baseUrl = 'https://www.alphavantage.co/query?'
const datatypeParam = 'datatype=json'
const API_KEY = 'FDJ2MV6W3X1URKR2'

router.use(cors())

router.get('/:equity', (req, res) => {
  console.log('Server called')
  const resObj = {
    '_links': {
    'self': {'href': req.url},
    'intraday': {'href': req.url + '/intraday-timeseries'},
    'daily': {'href': req.url + '/daily-timeseries'},
    'weekly': {'href': req.url + '/weekly-timeseries'},
    'monthly': {'href': req.url + '/monthly-timeseries'},
  }};
  res.send(resObj)
  // let equityParam = 'symbol=' + req.params.equity;
  // let functionParam = 'function=TIME_SERIES_INTRADAY';
  // let interval = 'interval=30min'
  // let datatypeParam = 'datatype=json'
  // const apiUrl = baseUrl + functionParam + '&' + equityParam + '&' + interval + '&' + datatypeParam
  // callApi(apiUrl, 'FDJ2MV6W3X1URKR2')
  // .then(data => res.send(data))
  // .catch(error => console.error(error))
});

router.get('/:equity/intraday-timeseries', (req, res) => {
  const equityParam = 'symbol=' + req.params.equity;
  const functionParam = 'function=TIME_SERIES_INTRADAY';
  const intervalParam = 'interval=15min'

  //Build Request URL
  const requestUrl = baseUrl + functionParam + '&' + equityParam + '&' + intervalParam + '&' + datatypeParam
  callApi(requestUrl, API_KEY)
  .then(data => res.send(data))
  .catch(error => console.error(error))
})

router.get('/:equity/daily-timeseries', (req, res) => {
  res.send('daily called')
})

router.get('/:equity/weekly-timeseries', (req, res) => {
  res.send('weekly called')
})

router.get('/:equity/monthly-timeseries', (req, res) => {
  res.send('monthly called')
})


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
