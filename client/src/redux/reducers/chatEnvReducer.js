import {
  START_VIDEO
} from '../actions/actionTypes';

const initialState = {
  isVideo: false
};

const chatEnvReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_VIDEO:
      return {
        ...state,
        isVideo: action.payload
      };
    default:
      return state
  }
};

export default chatEnvReducer;
