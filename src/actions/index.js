import * as types from './actionTypes';

export function closeMenuTab() {
  return {
    type: types.CLOSE_MENU_TAB,
  };
}

export function changeResultsList(courseInfo) {
  return {
    type: types.CHANGE_RESULTS_LIST,
    courseInfo
  };
}

export function changeUserFavorites(courseId) {
  return {
    type: types.CHANGE_USER_FAVORITES,
    courseId
  };
}

export function isFetching(boolean) {
  return {
    type: types.IS_FETCHING,
    boolean
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
    results
  };
}

export function setBaseLatLng(lat, lng) {
  return {
    type: types.SET_BASE_LAT_LNG,
    lat,
    lng
  };
}

export function setCoordinates(coordinates) {
  return {
    type: types.SET_COORDINATES,
    coordinates
  };
}

export function setCourseDetails(data) {
  return {
    type: types.SET_COURSE_DETAILS,
    data
  };
}

export function setDistance(distance) {
  return {
    type: types.SET_DISTANCE,
    distance
  };
}

export function setNewLatLng(lat, lng) {
  return {
    type: types.SET_NEW_LAT_LNG,
    lat,
    lng
  };
}

export function setPage(page) {
  return {
    type: types.SET_PAGE,
    page
  };
}

export function setUserAddress(address) {
  return {
    type: types.SET_USER_ADDRESS,
    address
  };
}

export function setUserDetails(nickName, photoUrl) {
  return {
    type: types.SET_USER_DETAILS,
    nickName,
    photoUrl
  };
}

export function setUserFavorites(favorites) {
  return {
    type: types.SET_USER_FAVORITES,
    favorites
  };
}

export function setUserInfo(userId, userName) {
  return {
    type: types.SET_USER_INFO,
    userId,
    userName
  };
}

export function setUserLocation(lat, lng) {
  return {
    type: types.SET_USER_LOCATION,
    lat,
    lng
  };
}

export function showMenuTab() {
  return {
    type: types.SHOW_MENU_TAB,
  };
}
