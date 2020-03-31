const socketio = require('socket.io');
const {
  CONNECTION,
  DISCONNECT,
  JOIN,
  MESSAGE,
  SEND_MESSAGE,
  ADD_MEMBER
} = require('./socketActions')
JOIN
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
        // Then add validation and arror handling
        // callback()
      }
      const { membersError, users } = DB.getAllUsers(room);
      if(membersError) {
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

module.exports = setIoServer;
