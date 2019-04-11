import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  menuTabOpened: false,
  page: '',
  searchedAddress: ''
};

export default function display(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { payload } = action;

  switch(action.type) {
    case types.CLOSE_MENU_TAB:
      newState.menuTabOpened = false;
      return newState;

    case types.IS_FETCHING:
      newState.isFetching = payload;
      return newState;

    case types.SET_PAGE:
      newState.page = payload;
      return newState;

    case types.SET_SEARCHED_ADDRESS:
      newState.searchedAddress = payload;
      return newState;

    case types.SHOW_MENU_TAB:
      newState.menuTabOpened = !newState.menuTabOpened;
      return newState;

    default:
      return state;
  }
}
