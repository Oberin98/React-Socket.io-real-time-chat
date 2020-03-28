const socketio = require('socket.io');

const {
  CONNECTION,
  DISCONNECT,
  JOIN
} = require('./socketActions')

const setIoServer = server => {
  const io = socketio(server);
  io.on(CONNECTION, (socket) => {
    console.log('We have a new Connection !!!');

    socket.on(JOIN, ({ name, room }, callback) => {
      console.log(name, room)

      callback()
    })

    socket.on(DISCONNECT, () => {
      console.log('User has left !!!');
    })
  })
}

module.exports = setIoServer
