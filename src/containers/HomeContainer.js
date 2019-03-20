import { connect } from 'react-redux';
import { setUserInfo, closeMenuTab } from '../actions';
import Home from '../components/Home';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  verifyToken: async () => {
    const ip = '192.168.0.40';
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const res = await fetch(`http://${ip}:5000/api/auth/verify`, {
          method: 'get',
          headers: {'Authorization': `Bearer ${token}`}
        });
        const json = await res.json();
        const { success, userId, userName } = json;

        if (success) {
          dispatch(setUserInfo(userId, userName));
        }
      }
    } catch(err) {
      console.log(err);
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
