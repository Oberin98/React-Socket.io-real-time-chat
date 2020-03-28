import {
  CONNECT_CHAT,
  ADD_MESSAGE
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
    default:
      return state
  }
};

export default chatReducer;
