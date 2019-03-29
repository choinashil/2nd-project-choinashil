import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import queryString from 'query-string'
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import CourseListContainer from '../containers/CourseListContainer';
import './Results.scss';


class Results extends Component {
  componentDidMount() {
    console.log('results did mount', this.props.results);

    const params = queryString.parse(this.props.location.search);
    const { lat, lon, distance } = params;
    const { searchCourses, setPage } = this.props;

    searchCourses(lat, lon, distance);
    setPage('Results');
  }  

  render() {
    const { history } = this.props;
    const { results } = this.props.results;

    return ( 
      <Fragment>
      <MenuContainer />
      <div className="Results">
        <div className="Results-header">
          <HeaderContainer />
        </div>
        <section className="Results-section">
          <CourseListContainer history={history} />
        </section>
        {results.length ? <footer>검색결과 총 {results.length}건</footer> : null}
      </div>
      </Fragment>
    );
  }
}

export default Results;
