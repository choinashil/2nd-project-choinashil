import React, { Component, Fragment } from 'react';
// import { BrowserRouter as Router, Link } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import CourseListContainer from '../containers/CourseListContainer';
import './Favorites.scss';

class Favorites extends Component {
  componentDidMount() {
    // console.log('favorites did mount', userId);
    const { getUserFavorites, resetBaseLatLng, setPage } = this.props;
    const { userId } = this.props.userInfo;
    console.log('favorites did mount', userId);

    // getUserFavorites(userId);
    resetBaseLatLng();
    setPage('Favorites');
  }

  componentDidUpdate() {
    const { getUserFavorites } = this.props;
    const { userId } = this.props.userInfo;
    let count = 0;
    if (userId && count === 0) {
      getUserFavorites(userId);
      count++;
    }
  }
  

  render() {
    const { history } = this.props;

    return ( 
      <Fragment>
        <MenuContainer />
        <div className="Favorites">
          <div className="Favorites-header">
            <HeaderContainer />
          </div>
          <section className="Favorites-section">
            <div className="Favorites-section-title">Favorites</div>
            <CourseListContainer history={history} />
          </section>
        </div>
      </Fragment>
    );
  }
}

export default Favorites;
