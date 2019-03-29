import { connect } from 'react-redux';
import { isFetching } from '../actions';
import ResultMap from '../components/ResultMap';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  // isFetching: boolean => {
  //   dispatch(isFetching(boolean));
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultMap);
