const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

const baseUrl = 'https://www.alphavantage.co/query?'

router.use(cors())

router.get('/:equitysymbol', (req, res) => {
    console.log('Server called')
    const equitySymbolParam = req.params.equitysymbol;
    const functionParam = 'function=SYMBOL_SEARCH';
    const keywordParam = 'keywords=' + equitySymbolParam;
    const datatypeParam = 'datatype=json';
    const apiUrl = baseUrl + functionParam + '&' + keywordParam + '&' + datatypeParam;
    callApi(apiUrl, 'FDJ2MV6W3X1URKR2')
    .then(data => res.send(data))
    .catch(error => console.error(error))
});

module.exports = router;

async function callApi(url, apiToken) {
  requestUrl = url + '&apikey=' + apiToken;
  const response = await fetch(requestUrl, {
    method: 'GET'
  });
  return await response.json();
}
