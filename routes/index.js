const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello from index')
});

module.exports = router;
