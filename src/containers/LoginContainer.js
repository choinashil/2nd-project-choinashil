import { connect } from 'react-redux';
import { isFetching, setUserInfo, closeMenuTab } from '../actions';
import Login from '../components/Login';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  isFetching: boolean => {
    dispatch(isFetching(boolean));
  },
  setUserInfo: (userId, userName) => {
    dispatch(setUserInfo(userId, userName));
  },
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
