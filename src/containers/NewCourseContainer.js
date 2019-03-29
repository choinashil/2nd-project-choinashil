import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { isFetching, resetCourseHistory, setNewLatLng, setUserInfo, closeMenuTab } from '../actions';
import NewCourse from '../components/NewCourse';
// import { ip } from '../lib/ip';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({

  isFetching: boolean => {
    dispatch(isFetching(boolean));
  },
//   setUserInfo: (userId, userName) => {
//     dispatch(setUserInfo(userId, userName));
//   },
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  saveNewCourse: async (userId, newCourseInfo) => {
    // dispatch(isFetching(true));
    
    try {
    const token = localStorage.getItem('access_token');
    // const ip = '192.168.0.47';
    console.log('---', newCourseInfo, token);

    console.log('ip', ip);
    const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/users/${userId}/new-course`, {
      method: 'post',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(newCourseInfo)
    });
    const json = await res.json();
    console.log('--json', json);


    dispatch(isFetching(false));

    return json.message;
    // dispatch(push('/'));


    } catch (err) {
      console.log('--err', err);
    }
  },
  resetCourseHistory: () => {
    dispatch(resetCourseHistory());
  },
  setNewLatLng: (lat, lng) => {
    dispatch(setNewLatLng(lat, lng));
  },
  verifyToken: async () => {
    // const ip = '192.168.200.108';
    // const ip = '192.168.0.47'; // 바코
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/auth/verify`, {
          method: 'get',
          headers: {'Authorization': `Bearer ${token}`}
        });
        const json = await res.json();
        const { success, userId, userName } = json;

        if (success) {
          dispatch(setUserInfo(userId, userName));
        }
      } else {
        alert('잘못된 접근입니다');
        ownProps.history.push('/');
      }
    } catch(err) {
      console.log(err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCourse);
