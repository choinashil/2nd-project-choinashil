import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import CourseListContainer from '../containers/CourseListContainer';
import Indicator from './Indicator';
import './Results.scss';

class Results extends Component {
  componentDidMount() {
    const { location, searchCourses, setPage } = this.props;
    const params = queryString.parse(location.search);
    const { lat, lng, distance } = params;

    searchCourses(lat, lng, distance);
    setPage('Results');
  }

  componentWillUnmount() {
    const { setPage } = this.props;
    setPage('');
  }

  render() {
    const { history, isFetching, results } = this.props;

    return (
      <Fragment>
        <MenuContainer />
        <div className="Results">
          <div className="Results-header">
            <HeaderContainer />
          </div>
          <section className="Results-section">
            { isFetching ?
              <Indicator />
              : <CourseListContainer history={history} />
            }
          </section>
          {!isFetching && results.length ? <footer>검색결과 총 {results.length}건</footer> : null}
        </div>
      </Fragment>
    );
  }
}

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  searchCourses: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

export default Results;
