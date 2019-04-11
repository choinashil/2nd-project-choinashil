import { connect } from 'react-redux';
import { resetCourseHistory, setNewLatLng } from '../actions';
import NewCourse from '../components/NewCourse';

const mapStateToProps = state => {
  const { coordinates, distance } = state.course;
  const { userId, userName } = state.userInfo;

  return { coordinates, distance, userId, userName };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetCourseHistory: () => {
    dispatch(resetCourseHistory());
  },
  saveNewCourse: async (userId, newCourseInfo) => {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/users/${userId}/new-course`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourseInfo)
      });
      const json = await res.json();
      return json.message;
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
