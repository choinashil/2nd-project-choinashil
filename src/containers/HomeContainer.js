import { connect } from 'react-redux';
import { setUserAddress, setUserLocation, closeMenuTab } from '../actions';
import Home from '../components/Home';
import { googleApiKey } from '../config/googleApiKey';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  getCurrentAddress: async (lat, lng) => {
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`);
      const json = await res.json();
      const address = json.results[0].formatted_address;
      dispatch(setUserAddress(address));
      return address;
    } catch (err) {
      console.log(err);
    }
  },
  askUserLocation: () => {
    const geoOptions = {
      maximumAge: 5 * 60 * 1000,
    }

    function geoSuccess(coordinates) {
      const { latitude, longitude } = coordinates.coords;
      console.log('Found coordinates: ', latitude, longitude);
      dispatch(setUserLocation(latitude, longitude));
    }

    function geoError(error) {
      if (error.code === 0) {
        alert('unknown error');
      } else if (error.code === 1) {
        alert('user said no');
      } else if (error.code === 2) {
        alert('position unavailable');
      } else if (error.code === 3) {
        alert('time out');
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
