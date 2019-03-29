import { connect } from 'react-redux';
import { isFetching, resetBaseLatLng, setPage, setUserFavorites } from '../actions';
import Favorites from '../components/Favorites';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  getUserFavorites: async userId => {
    try {
      dispatch(isFetching(true));

      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://running-course-app.eu-west-1.elasticbeanstalk.com/api/users/${userId}/favorites`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      const { favorites } = json;

      dispatch(setUserFavorites(favorites));

    } catch (err) {
      console.log('err', err);
    }
  },
  resetBaseLatLng: () => {
    dispatch(resetBaseLatLng());
  },
  setPage: page => {
    dispatch(setPage(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
