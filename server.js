'use strict';

var express = require('express'),
  app = express(),
  http = require('http'),
  server = http.createServer(app);

app.use(express.static(__dirname + '/'));

server.listen(3000, function() {
  console.log('Looking legit on port %d', 3000);
});