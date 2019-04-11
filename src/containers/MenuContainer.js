import { connect } from 'react-redux';
import { closeMenuTab, resetUserInfo } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = state => {
  const { menuTabOpened } = state.display;
  const { userId } = state.userInfo;
  return { menuTabOpened, userId };
};

const mapDispatchToProps = dispatch => ({
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  resetUserInfo: () => {
    dispatch(resetUserInfo());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
