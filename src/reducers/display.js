import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  menuTabOpened: false,
  page: ''
};

export default function display(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { boolean, page } = action;

  switch(action.type) {
    case types.CLOSE_MENU_TAB:
      newState.menuTabOpened = false;
      return newState;

    case types.IS_FETCHING:
      newState.isFetching = boolean;
      return newState;

    case types.SET_PAGE:
      newState.page = page;
      return newState;

    case types.SHOW_MENU_TAB:
      newState.menuTabOpened = !newState.menuTabOpened;
      return newState;

    default:
      return state;
  }
}
