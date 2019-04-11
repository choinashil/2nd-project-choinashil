import * as types from '../actions/actionTypes';

const initialState = {
  baseLat: '37.501288',
  baseLng: '126.988099',
  results: [],
  details: {
    coordinates: [],
    likeIds: []
  }
};

export default function results(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { payload } = action;

  switch(action.type) {
    case types.CHANGE_RESULTS_LIST:
      const targetIdx = newState.results.findIndex(course => {
        return course._id === payload._id;
      });
      newState.results[targetIdx] = payload;
      return newState;

    case types.RESET_BASE_LAT_LNG:
      newState.baseLat = '37.501288';
      newState.baseLng = '126.988099';
      return newState;

    case types.SAVE_RESULTS_LIST:
      newState.results = payload;
      return newState;

    case types.SET_BASE_LAT_LNG:
      newState.baseLat = payload.lat;
      newState.baseLng = payload.lng;
      return newState;

    case types.SET_COURSE_DETAILS:
      newState.details = payload;
      return newState;

    default:
      return state;
  }
}
