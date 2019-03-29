import { connect } from 'react-redux';
import { closeMenuTab, isFetching, setUserDetails } from '../actions';
import Profile from '../components/Profile';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  getUserInfo: async userId => {
    try {
      dispatch(isFetching(true));
      const token = localStorage.getItem('access_token');
      const ip = '192.168.0.47'; // 바코

      const res = await fetch(`http://${ip}:5000/api/users/${userId}/profile`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      // console.log('--profile res', json);
      const { userInfo } = json;
      const { nickName, photoUrl } = userInfo;
      
      dispatch(setUserDetails(nickName, photoUrl));
      dispatch(isFetching(false));
    } catch (err) {
      console.log('err', err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);