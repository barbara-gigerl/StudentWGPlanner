import { combineReducers } from 'redux';

import wgReducer from './wg';
import userReducer from './user'

const rootReducer = combineReducers({
  wg: wgReducer,
  userid: userReducer
});

export default rootReducer;
