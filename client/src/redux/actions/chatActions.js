import {
  CONNECT_CHAT,
  ADD_MESSAGE,
  SET_ROM_AND_NAME,
  ADD_MEMBER
} from './actionTypes';

export const connectChat = (name, room) => ({
  type: CONNECT_CHAT,
  payload: {
    name,
    room
  }
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message
})


export const setRoomAndName = (room, name) => {
  return {
    type: SET_ROM_AND_NAME,
    payload: {
      room,
      name
    }
  }
}

export const addMember = (members) => ({
  type: ADD_MEMBER,
  payload: members
})
