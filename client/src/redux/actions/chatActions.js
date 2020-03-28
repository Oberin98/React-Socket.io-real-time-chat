import {
  CONNECT_CHAT,
  ADD_MESSAGE
} from './actionTypes';

export const connectChat = (name, room) => ({
  type: CONNECT_CHAT,
  payload: {
    name,
    room
  }
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message  
})
