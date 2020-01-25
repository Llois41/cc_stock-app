const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send(process.env.SECRET_MESSAGE +
    process.env.API_KEY + 
    process.env.ALPHAVANTAGE_API_URL);
});

module.exports = router;
