const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

const router = require('./routers/router');

const {
  CONNECTION,
  DISCONNECT
} = require('./sockets/socketActions')

io.on(CONNECTION, (socket) => {
  console.log('We have a new Connection !!!');

  socket.on(DISCONNECT, () => {
    console.log('User has left !!!');
  })
})

app.use(logger('dev'));
app.use(router);

server.listen(PORT, () => {
  console.log('Server has started');
});
