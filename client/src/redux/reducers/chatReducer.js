import {
  CONNECT_CHAT
} from '../actions/actionTypes';

const initialState = {
  name: '',
  room: ''
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_CHAT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state
  }
};

export default chatReducer;
