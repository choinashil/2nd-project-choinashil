import * as types from '../actions/actionTypes';

const initialState = {
  baseLat: 37.501288, 
  baseLng: 126.988099,
  results: [],
  details: {
    coordinates: [],
    likeIds: []
  }
};

export default function results(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { courseInfo, data, lat, lng, results } = action;

  switch(action.type) {
    case types.CHANGE_RESULTS_LIST: 
      const targetIdx = newState.results.findIndex(course => {
        return course._id === courseInfo._id;
      });
      newState.results[targetIdx] = courseInfo;
      return newState;
    
    case types.RESET_BASE_LAT_LNG:
      newState.baseLat = 37.501288;
      newState.baseLng = 126.988099;
      return newState;

    case types.SET_BASE_LAT_LNG:
      newState.baseLat = lat;
      newState.baseLng = lng;
      return newState;

    case types.SAVE_RESULTS_LIST:
      newState.results = results;
      return newState;

    case types.SET_COURSE_DETAILS:
      newState.details = data;
      return newState;

    default:
      return state;
  }
}
