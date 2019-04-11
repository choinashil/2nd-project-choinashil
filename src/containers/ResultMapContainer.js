import { connect } from 'react-redux';
import ResultMap from '../components/ResultMap';

const mapStateToProps = state => {
  const { baseLat, baseLng, details } = state.results;
  return { baseLat, baseLng, details };
};

export default connect(
  mapStateToProps
)(ResultMap);
