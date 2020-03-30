class User {
  constructor({ id, name }) {
    this.name = name;
    this.id = id;
  }
}

class Chat {
  constructor(room) {
    this.users = [];
    this.room = room;
  }

  addUser({ id, name }) {
    name = name.trim().toLowerCase();

    const existingUser = this.users.some(user => user.name === name);

    if (existingUser) {
      return { error: 'Such user has alrerady exist' }
    }

    const user = new User({ id, name });

    this.users.push(user)

    return user
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id)
  }

  getUser(id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return { error: 'There is no such user in the chat' }
    }

    return user
  }
}

class MyDatabase {
  chats = [];

  createNewChat({ room, id, name }) {
    const existingChat = this.chats.findIndex(chat => chat.room === room);
    if (existingChat > -1) {
      this.chats[existingChat].addUser({ id, name });
    }

    const chat = new Chat(room);
    chat.addUser({ id, name });

    this.chats.push(chat);
    return chat
  }

  addUserToChat({ id, name, room }) {
    const existingChat = this.chats.findIndex(chat => chat.room === room);

    if (existingChat > -1) {
      this.chats[existingChat].addUser({ id, name });

      return { chat: this.chats[existingChat] };
    }

    return { error: 'Chat with this name does not exist' }
  }

  getUserFromChat({ room, id }) {
    const chat = this.chats.find(chat => chat.room === room);
    if (!chat) {
      return { error: 'There is no such user' }
    }
    return chat.getUser(id)
  }
}

const db = new MyDatabase();

module.exports = db;
