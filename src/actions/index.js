import * as types from './actionTypes';

export function closeMenuTab() {
  return {
    type: types.CLOSE_MENU_TAB,
  };
}

export function isFetching(boolean) {
  return {
    type: types.IS_FETCHING,
    boolean
  };
}

export function setUserInfo(userId, userName) {
  return {
    type: types.SET_USER_INFO,
    userId,
    userName
  };
}

export function showMenuTab() {
  return {
    type: types.SHOW_MENU_TAB,
  };
}
