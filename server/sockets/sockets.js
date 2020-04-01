const socketio = require('socket.io');
const {
  CONNECTION,
  DISCONNECT,
  JOIN,
  MESSAGE,
  SEND_MESSAGE,
  ADD_MEMBER,
  CALL,
  BACK_CALL,
  MAKE_ANSWER,
  ANSWER_MADE
} = require('./socketActions')

const DB = require('../DB/DB');

const setIoServer = server => {
  const io = socketio(server);
  io.on(CONNECTION, (socket) => {
    console.log('We have a new Connection !!!');

    socket.on(JOIN, ({ name, room }, callback) => {
      const id = socket.id;
      let { error, chat } = DB.addUserToChat({ name, room, id });
      if (error) {
        chat = DB.createNewChat({ name, room, id });
        // Then add validation and error handling
        // callback()
      }
      const { membersError, users } = DB.getAllUsers(room);
      if (membersError) {
        socket.emit(MEMBERS_ERROR)
      } else {
        socket.emit(ADD_MEMBER, users)
      }

      socket.emit(MESSAGE, { user: 'admin', message: `User ${name} welcome to ${room} room!` });
      socket.broadcast.to(chat.room).emit(MESSAGE, { user: 'admin', message: `${name} has joined!` });

      socket.join(chat.room);
      callback();
    })

    socket.on(SEND_MESSAGE, ({ message, room }, callback) => {
      const id = socket.id;
      const user = DB.getUserFromChat({ room, id });
      io.in(room).emit(MESSAGE, { user: user.name, message });

      callback();
    })

    socket.on(CALL, ({ offer, room }) => {
      // There must be a broadcast against simple emit
      io.in(room).emit(BACK_CALL, { offer, room })
    })

    socket.on(MAKE_ANSWER, ({ answer, room }) => {
      io.in(room).emit(ANSWER_MADE, answer);
    })

    socket.on(DISCONNECT, (message, callback) => {
      console.log('User has left !!!');
    })
  })
}

module.exports = setIoServer;
