var createError = require('http-errors');
var express = require('express');

var indexRouter = require('./routes/index');

const API_TOKEN = 'FDJ2MV6W3X1URKR2';

var app = express();
app.use('/', indexRouter);

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
