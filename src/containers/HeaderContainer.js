import { connect } from 'react-redux';
import { showMenuTab } from '../actions';
import Header from '../components/Header';

const mapStateToProps = state => {
  const { menuTabOpened } = state.display;
  return { menuTabOpened };
};

const mapDispatchToProps = dispatch => ({
  showMenuTab: () => {
    dispatch(showMenuTab());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
