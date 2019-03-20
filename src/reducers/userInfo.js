import * as types from '../actions/actionTypes';

const initialState = {
  userId: null,
  userName: null
};

export default function userInfo(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { userId, userName } = action;

  switch(action.type) {
    case types.SET_USER_INFO:
      newState.userId = userId;
      newState.userName = userName;
      return newState;

    default:
      return state;
  }
}
