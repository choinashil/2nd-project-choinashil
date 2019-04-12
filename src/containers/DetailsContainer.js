import { connect } from 'react-redux';
import { isFetching, setCourseDetails } from '../actions';
import Details from '../components/Details';

const mapStateToProps = state => {
  const { isFetching } = state.display;
  const { userId } = state.userInfo;
  const { details } = state.results;

  return { details, isFetching, userId };
};

const mapDispatchToProps = dispatch => ({
  changeFavoritesData: async (userId, courseId) => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://nashu.me/api/users/${userId}/courses/${courseId}/like`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      const { changedCourseInfo } = json;

      dispatch(setCourseDetails(changedCourseInfo));

    } catch (err) {
      console.log('err', err);
    }
  },
  getCourseDetails: async courseId => {
    dispatch(isFetching(true));
    try {
      const res = await fetch(`https://nashu.me/api/courses/${courseId}/details`);
      const json = await res.json();
      const { courseInfo } = json;

      dispatch(setCourseDetails(courseInfo));
      dispatch(isFetching(false));

    } catch (err) {
      console.log('err', err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
