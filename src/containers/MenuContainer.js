import { connect } from 'react-redux';
import { closeMenuTab, setUserInfo } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
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
)(Menu);
