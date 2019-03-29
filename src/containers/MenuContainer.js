import { connect } from 'react-redux';
import { closeMenuTab, resetUserInfo } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = state => {
  return state;
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
