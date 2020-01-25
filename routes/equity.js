'use strict'

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

const baseUrl = process.env.ALPHAVANTAGE_API_URL
const datatypeParam = 'datatype=json';
const API_KEY = process.env.API_KEY;
router.use(cors());

router.get('/:equity', (req, res) => {
  const resObj = {
    '_links': {
      'self': { 'href': req.url },
      'latest':{ 'href': req.url + '/latest'},
      'intraday': { 'href': req.url + '/intraday-timeseries' },
      'daily': { 'href': req.url + '/daily-timeseries' },
      'weekly': { 'href': req.url + '/weekly-timeseries' },
      'monthly': { 'href': req.url + '/monthly-timeseries' },
    }
  };
  res.send(resObj);
});

router.get('/:equity/intraday-timeseries', (req, res) => {
  const equityParam = 'symbol=' + req.params.equity;
  const functionParam = 'function=TIME_SERIES_INTRADAY';
  const intervalParam = 'interval=15min';
  //console.log(API_KEY);
  //console.log(baseUrl);

  //Build Request URL
  const requestUrl = baseUrl + functionParam + '&' + equityParam + '&' + intervalParam + '&' + datatypeParam;
  callApi(requestUrl, API_KEY)
    .then(data => res.send(data))
    .catch(error => console.error(error));
})

router.get('/:equity/daily-timeseries', (req, res) => {
  const equityParam = 'symbol=' + req.params.equity;
  const functionParam = 'function=TIME_SERIES_DAILY';

  //Build Request URL
  const requestUrl = baseUrl + functionParam + '&' + equityParam + '&' + datatypeParam;
  callApi(requestUrl, API_KEY)
    .then(data => res.send(data))
    .catch(error => console.error(error));
})

router.get('/:equity/weekly-timeseries', (req, res) => {
  const equityParam = 'symbol=' + req.params.equity;
  const functionParam = 'function=TIME_SERIES_WEEKLY';

  //Build Request URL
  const requestUrl = baseUrl + functionParam + '&' + equityParam + '&' + datatypeParam;
  callApi(requestUrl, API_KEY)
    .then(data => res.send(data))
    .catch(error => console.error(error));
})

router.get('/:equity/monthly-timeseries', (req, res) => {
  const equityParam = 'symbol=' + req.params.equity;
  const functionParam = 'function=TIME_SERIES_MONTHLY';

  //Build Request URL
  const requestUrl = baseUrl + functionParam + '&' + equityParam + '&' + datatypeParam;
  callApi(requestUrl, API_KEY)
    .then(data => res.send(data))
    .catch(error => console.error(error));
})

router.get('/:equity/latest', (req, res) => {
  const equityParam = 'symbol=' + req.params.equity;
  const functionParam = 'function=GLOBAL_QUOTE';

  //Build Request URL
  const requestUrl = baseUrl + functionParam + '&' + equityParam + '&' + datatypeParam;
  callApi(requestUrl, API_KEY)
    .then(data => res.send(data))
    .catch(error => console.error(error));
})

module.exports = router;

async function callApi(apiUrl, apiToken) {
  try {
    return await getTimeSeries(apiUrl, apiToken);
  } catch (error) {
    console.error(error);
  }

  async function getTimeSeries(url, apiToken) {
    let requestUrl = url + '&apikey=' + apiToken;
    const response = await fetch(requestUrl, {
      method: 'GET',
    });
    return await response.json();
  }
}
