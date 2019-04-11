import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import CourseListContainer from '../containers/CourseListContainer';
import Indicator from './Indicator';
import './Favorites.scss';

class Favorites extends Component {
  componentDidMount() {
    const { getUserFavorites, resetBaseLatLng, setPage, userId } = this.props;
    resetBaseLatLng();
    setPage('Favorites');

    if (userId) {
      getUserFavorites(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { getUserFavorites, userId } = this.props;
    const initUserId = prevProps.userId;

    if(initUserId !== userId && userId) {
      getUserFavorites(userId);
    }
  }

  render() {
    const { history, isFetching } = this.props;

    return (
      <Fragment>
        <MenuContainer />
        <div className="Favorites">
          <div className="Favorites-header">
            <HeaderContainer />
          </div>
          <section className="Favorites-section">
            { isFetching ?
              <Indicator /> :
              <Fragment>
                <div className="Favorites-section-title">Favorites</div>
                <CourseListContainer history={history} />
              </Fragment>
            }
          </section>
        </div>
      </Fragment>
    );
  }
}

Favorites.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  getUserFavorites: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  resetBaseLatLng: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

export default Favorites;
