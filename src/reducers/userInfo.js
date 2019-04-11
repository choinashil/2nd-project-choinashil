import * as types from '../actions/actionTypes';

const initialState = {
  userId: '',
  userName: '',
  nickName: '',
  photoUrl: '',
  favorites: [],
  address: '',
  lat: 0,
  lng: 0
};

export default function userInfo(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { payload } = action;

  switch(action.type) {
    case types.CHANGE_USER_FAVORITES:
      const targetIdx = newState.favorites.findIndex(course => {
        return course._id === payload;
      });
      newState.favorites.splice(targetIdx, 1);
      return newState;

    case types.RESET_USER_INFO:
      newState.userId = '';
      newState.userName = '';
      newState.nickName = '';
      newState.photoUrl = '';
      newState.favorites = [];
      newState.address = '';
      newState.lat = 0;
      newState.lng = 0;
      return newState;

    case types.SET_USER_ADDRESS:
      newState.address = payload;
      return newState;

    case types.SET_USER_DETAILS:
      newState.nickName = payload.nickName;
      newState.photoUrl = payload.photoUrl;
      return newState;

    case types.SET_USER_FAVORITES:
      newState.favorites = payload;
      return newState;

    case types.SET_USER_INFO:
      newState.userId = payload.userId;
      newState.userName = payload.userName;
      return newState;

    case types.SET_USER_LOCATION:
      newState.lat = payload.lat;
      newState.lng = payload.lng;
      return newState;

    default:
      return state;
  }
}
