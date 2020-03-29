import {
  CONNECT_CHAT,
  ADD_MESSAGE,
  SET_ROM_AND_NAME
} from '../actions/actionTypes';

const initialState = {
  name: '',
  room: '',
  messages: []
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_CHAT:
      return {
        ...state,
        ...action.payload
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case SET_ROM_AND_NAME:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state
  }
};

export default chatReducer;
