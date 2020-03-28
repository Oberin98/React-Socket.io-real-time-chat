import {
  CONNECT_CHAT,
} from './actionTypes';

export const connectChat  = (name, room) => ({
  type: CONNECT_CHAT,
  payload: {
    name,
    room
  }
})
