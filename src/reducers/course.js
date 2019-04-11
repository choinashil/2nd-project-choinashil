import * as types from '../actions/actionTypes';

const initialState = {
  address: '',
  alertMessage: '',
  distance: 0,
  coordinates: [],
  lat: 0,
  lng: 0
};

export default function course(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { payload } = action;

  switch(action.type) {
    case types.RESET_COURSE_HISTORY:
      newState.distance = 0;
      newState.coordinates = [];
      newState.lat = 0;
      newState.lng = 0;
      return newState;

    case types.SET_COORDINATES:
      newState.coordinates = payload;
      return newState;

    case types.SET_DISTANCE:
      newState.distance = payload;
      return newState;

    case types.SET_NEW_LAT_LNG:
      newState.lat = payload.lat;
      newState.lng = payload.lng;
      return newState;

    default:
      return state;
  }
}
