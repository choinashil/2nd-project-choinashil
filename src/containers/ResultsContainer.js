import { connect } from 'react-redux';
import { isFetching, saveResultsList, setBaseLatLng, setPage } from '../actions';
import Results from '../components/Results';

const mapStateToProps = state => {
  const { isFetching } = state.display;
  const { results } = state.results;

  return { isFetching, results };
};

const mapDispatchToProps = dispatch => ({
  searchCourses: async (lat, lng, distance) => {
    try {
      dispatch(isFetching(true));
      const api = 'https://nashu.me/api/courses?';
      const searchLatLng = `lat=${lat}&lng=${lng}`;
      const searchDistance = `distance=${distance}`;
      let res;

      if (distance) {
        res = await fetch(`${api}${searchLatLng}&${searchDistance}`);
      } else {
        res = await fetch(`${api}${searchLatLng}`);
      }
      const json = await res.json();

      dispatch(setBaseLatLng(lat, lng));
      dispatch(saveResultsList(json.results));
      dispatch(isFetching(false));

    } catch (err) {
      console.log('err', err);
    }
  },
  setPage: page => {
    dispatch(setPage(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
