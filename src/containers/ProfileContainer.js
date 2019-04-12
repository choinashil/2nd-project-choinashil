import { connect } from 'react-redux';
import { isFetching, setUserDetails } from '../actions';
import Profile from '../components/Profile';

const mapStateToProps = state => {
  const { isFetching } = state.display;
  const { nickName, photoUrl, userId } = state.userInfo;

  return { isFetching, nickName, photoUrl, userId };
};

const mapDispatchToProps = dispatch => ({
  getUserInfo: async userId => {
    try {
      dispatch(isFetching(true));

      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://nashu.me/api/users/${userId}/profile`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
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
