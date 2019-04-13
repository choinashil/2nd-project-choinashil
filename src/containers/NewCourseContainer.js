import { connect } from 'react-redux';
import { isFetching, resetCourseHistory, setNewLatLng } from '../actions';
import NewCourse from '../components/NewCourse';

const mapStateToProps = state => {
  const { isFetching } = state.display;
  const { coordinates, distance } = state.course;
  const { userId, userName } = state.userInfo;

  return { coordinates, distance, isFetching, userId, userName };
};

const mapDispatchToProps = dispatch => ({
  resetCourseHistory: () => {
    dispatch(resetCourseHistory());
  },
  saveNewCourse: async (userId, newCourseInfo) => {
    try {
      dispatch(isFetching(true));

      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://nashu.me/api/users/${userId}/new-course`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourseInfo)
      });

      const json = await res.json();
      dispatch(isFetching(false));

      return json;

    } catch (err) {
      console.log(err);
    }
  },
  setNewLatLng: (lat, lng) => {
    dispatch(setNewLatLng(lat, lng));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCourse);
