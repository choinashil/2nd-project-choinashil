import * as types from '../actions/actionTypes';

const initialState = {
  distance: 0,
  coordinates: [],
  lat: 0,
  lng: 0
};

export default function course(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { coordinates, distance, lat, lng } = action;

  switch(action.type) {
    case types.SET_COORDINATES:
      newState.coordinates = coordinates;
      return newState;

    case types.SET_DISTANCE:
      newState.distance = distance;
      return newState;

    case types.SET_NEW_LAT_LNG:
      newState.lat = lat;
      newState.lng = lng;
      return newState;
    
    case types.RESET_COURSE_HISTORY: 
      newState.distance = 0;
      newState.coordinates = [];
      newState.lat = 0;
      newState.lng = 0;
      return newState;

    default:
      return state;
  }
}
