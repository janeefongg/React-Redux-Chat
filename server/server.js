const express = require('express');
const http = require('http');
const path = require('path');

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const app = express();

const server = http.createServer(app);
const socket = require('./helpers/socket');
const io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

const isInProduction = process.env.NODE_ENV === 'production';
const port = isInProduction ? process.env.PORT : 3000;

if (!isInProduction) {
  const bundle = require('./bundle');
  bundle();
  
  app.all('/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

app.use(express.static('./'));

server.listen(port, function () {
  console.log('Listening on port 8080...')
});

module.exports = socket;