'use strict';

var express = require('express'),
  app = express(),
  http = require('http'),
  server;

app.use(express.static(__dirname + '/app'));

server = http.createServer(app);

server.listen(3000, function() {
  console.log('Looking legit on port %d', 3000);
});