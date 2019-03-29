import { combineReducers } from 'redux';
import course from './course';
import display from './display';
import results from './results';
import userInfo from './userInfo';

const reducers = combineReducers({
  course,
  display,
  results,
  userInfo
});

export default reducers;
