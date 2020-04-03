import { combineReducers } from 'redux';

import chatReducer from './reducers/chatReducer';
import chatEnvReducer from './reducers/chatEnvReducer';

const reducers = combineReducers({
  chatReducer,
  chatEnvReducer
})

export default reducers;
