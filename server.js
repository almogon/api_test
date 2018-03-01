var express = require('express'),
    app = express(),
    bodyParser  = require('body-parser'),
    routes = require('./routes/routes'),
    log4js = require('log4js');

// Globals
global._ = require('underscore');
global.moment= require('moment');
global.store = require('store');
global.LOG = log4js.getLogger();
LOG.level = 'info';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, function() {
  console.log('Node server running on http://localhost:3000');
});

module.exports = app;