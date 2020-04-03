const socketio = require('socket.io');
const {
  CONNECTION,
  DISCONNECT,
  JOIN,
  MESSAGE,
  SEND_MESSAGE,
  CALL
} = require('./socketActions')


const setIoServerForVideo = server => {
  const io = socketio(server);
  io.on(CONNECTION, (socket) => {
    console.log('We have a new Connection !!!');

    socket.on(JOIN, ({ name, room, offer }, callback) => {
      const id = socket.id;

      socket.to(room).emit(CALL, {
        offer,
        room
      });

    })

    socket.on(SEND_MESSAGE, ({ message, room }, callback) => {
      const id = socket.id;
      console.log(message, room)
      const user = DB.getUserFromChat({ room, id });
      io.in(room).emit(MESSAGE, { user: user.name, message });
      // io.emit(MESSAGE, { user: user.name, message });

      callback();
    })

    socket.on(DISCONNECT, (message, callback) => {
      console.log('User has left !!!');
    })
  })
}

module.exports = setIoServerForVideo;
