import { connect } from 'react-redux';
import { isFetching, setCourseDetails } from '../actions';
import Details from '../components/Details';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  // isFetching: boolean => {
  //   dispatch(isFetching(boolean));
  // },
  changeFavoritesData: async (userId, courseId) => {
    try {
      // const ip = '192.168.0.47'; // 바코

      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/users/${userId}/courses/${courseId}/like`, {
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
      // const ip = '192.168.0.47'; // 바코
      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/courses/${courseId}/details`);
      const json = await res.json();
      // console.log('result', json);
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
