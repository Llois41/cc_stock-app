var createError = require('http-errors');
var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/index');
let equityRouter= require('./routes/equity');

var app = express();
// app.use('/', indexRouter);
app.use('/equities', equityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
