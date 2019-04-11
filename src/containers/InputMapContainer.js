import { connect } from 'react-redux';
import { setCoordinates, setDistance } from '../actions';
import InputMap from '../components/InputMap';

const mapStateToProps = state => {
  const { course, userInfo } = state;
  return { course, userInfo };
};

const mapDispatchToProps = dispatch => ({
  getDistance: distance => {
    const editedDistance = parseFloat(Number(distance).toFixed(2));
    dispatch(setDistance(editedDistance));
  },
  getCoordinates: features => {
    if (features.length) {
      const coordinates = features.pop().geometry.coordinates;
      dispatch(setCoordinates(coordinates));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputMap);
