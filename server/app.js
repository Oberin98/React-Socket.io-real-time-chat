const express = require('express');
const http = require('http');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);

// IO server
const setIoServer = require('./sockets/sockets');
setIoServer(server);

const PORT = process.env.PORT || 5000;

const router = require('./routers/router');

app.use(logger('dev'));
app.use(router);

server.listen(PORT, () => {
  console.log('Server has started');
});


module.exports = server
