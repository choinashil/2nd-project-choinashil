import { combineReducers } from 'redux';
import display from './display';
import userInfo from './userInfo';

const reducers = combineReducers({
  display,
  userInfo
});

export default reducers;
