import { combineReducers } from 'redux';

import wgReducer from './wg';

const rootReducer = combineReducers({
  wg: wgReducer
});

export default rootReducer;
