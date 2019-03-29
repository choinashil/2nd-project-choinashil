import { connect } from 'react-redux';
import { isFetching, saveResultsList, setBaseLatLng, setUserInfo, setUserAddress, setUserLocation, closeMenuTab } from '../actions';
import Home from '../components/Home';
// import { ip } from '../lib/ip';
const ip = '192.168.0.47'; // 바코


const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  closeMenuTab: () => {
    dispatch(closeMenuTab());
  },
  getCurrentAddress: async (lat, lng) => {
    const googleApiKey = 'AIzaSyChzbdV01n82aAAEsf2dvXuMnIIaVforYs';
    try {
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApiKey}`);
      const json = await res.json();
      console.log('current location', json);
      const address = json.results[0].formatted_address;
      
      console.log('address', address);
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
        // unknown error
        alert('unknown error');
      } else if (error.code === 1) {
        // they said no
        alert('user said no');
      } else if (error.code === 2) {
        // position unavailable
        alert('position unavailable');
      } else if (error.code === 3) {
        // timeout
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
