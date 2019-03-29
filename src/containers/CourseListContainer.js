import { connect } from 'react-redux';
import { changeResultsList, changeUserFavorites } from '../actions';
import CourseList from '../components/CourseList';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({

  toggleLikes: async (page, userId, courseId) => {
    try {
      // const ip = '192.168.0.47'; // 바코

      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/users/${userId}/courses/${courseId}/like`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      const { changedCourseInfo } = json;

      if (page === 'Results') {
        dispatch(changeResultsList(changedCourseInfo));
      } else if (page === 'Favorites') {
        dispatch(changeUserFavorites(courseId));
      }

    } catch (err) {
      console.log('err', err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseList);
