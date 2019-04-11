import * as types from './actionTypes';

export function changeResultsList(courseInfo) {
  return {
    type: types.CHANGE_RESULTS_LIST,
    payload: courseInfo
  };
}

export function changeUserFavorites(courseId) {
  return {
    type: types.CHANGE_USER_FAVORITES,
    payload: courseId
  };
}

export function closeMenuTab() {
  return {
    type: types.CLOSE_MENU_TAB,
  };
}

export function isFetching(boolean) {
  return {
    type: types.IS_FETCHING,
    payload: boolean
  };
}

export function resetBaseLatLng() {
  return {
    type: types.RESET_BASE_LAT_LNG
  };
}

export function resetCourseHistory() {
  return {
    type: types.RESET_COURSE_HISTORY
  };
}

export function resetUserInfo() {
  return {
    type: types.RESET_USER_INFO
  };
}

export function saveResultsList(results) {
  return {
    type: types.SAVE_RESULTS_LIST,
    payload: results
  };
}

export function setBaseLatLng(lat, lng) {
  return {
    type: types.SET_BASE_LAT_LNG,
    payload: { lat, lng }
  };
}

export function setCoordinates(coordinates) {
  return {
    type: types.SET_COORDINATES,
    payload: coordinates
  };
}

export function setCourseDetails(data) {
  return {
    type: types.SET_COURSE_DETAILS,
    payload: data
  };
}

export function setDistance(distance) {
  return {
    type: types.SET_DISTANCE,
    payload: distance
  };
}

export function setNewLatLng(lat, lng) {
  return {
    type: types.SET_NEW_LAT_LNG,
    payload: { lat, lng }
  };
}

export function setPage(page) {
  return {
    type: types.SET_PAGE,
    payload: page
  };
}

export function setSearchedAddress(address) {
  return {
    type: types.SET_SEARCHED_ADDRESS,
    payload: address
  };
}

export function setUserAddress(address) {
  return {
    type: types.SET_USER_ADDRESS,
    payload: address
  };
}

export function setUserDetails(nickName, photoUrl) {
  return {
    type: types.SET_USER_DETAILS,
    payload: { nickName, photoUrl }
  };
}

export function setUserFavorites(favorites) {
  return {
    type: types.SET_USER_FAVORITES,
    payload: favorites
  };
}

export function setUserInfo(userId, userName) {
  return {
    type: types.SET_USER_INFO,
    payload: { userId, userName }
  };
}

export function setUserLocation(lat, lng) {
  return {
    type: types.SET_USER_LOCATION,
    payload: { lat, lng }
  };
}

export function showMenuTab() {
  return {
    type: types.SHOW_MENU_TAB,
  };
}
