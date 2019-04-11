import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import ResultMapContainer from '../containers/ResultMapContainer';
import Indicator from './Indicator';
import './Details.scss';

class Details extends Component {
  componentDidMount() {
    const { getCourseDetails, match } = this.props;
    const { course_id } = match.params;
    getCourseDetails(course_id);
  }

  _onHeartClick() {
    const { changeFavoritesData, userId, match } = this.props;
    const { course_id } = match.params;

    if (userId) {
      changeFavoritesData(userId, course_id);
    } else {
      alert('즐겨찾기는 로그인 후 이용가능합니다!');
    }
  }

  _checkFavorites(likeIds) {
    const { userId } = this.props;
    return likeIds.includes(userId) ? true : false;
  }

  render() {
    const { match, details, isFetching } = this.props;
    const { course_id } = match.params;
    const { _id, title, distance, userName, description, locker, restroom, gourmet, likeIds } = details;

    return (
      <Fragment>
      <MenuContainer />
      <div className="Details">
        <div className="Details-header">
          <HeaderContainer />
        </div>
        <section className="Details-section">
          { isFetching ?
            <Indicator /> :
            <Fragment>
              <div className="Details-section-map">
                {_id === course_id ? <ResultMapContainer /> : null}
                <div className="Details-section-map-distance">{distance}km</div>
              </div>
              <div className="Details-section-wrapper">
                <div className="Details-section-menu">
                  <div>
                    <div
                      className="Details-section-heart"
                      onClick={this._onHeartClick.bind(this)}
                    >
                      {this._checkFavorites(likeIds) ?
                        <i className="fas fa-heart fa-heart-filled" />
                        : <i className="far fa-heart fa-heart-blank" />
                      }
                    </div>
                    <i className="far fa-comment" />
                    <i className="fas fa-external-link-alt" />
                  </div>
                  <div>
                    <i className="fas fa-ellipsis-h" />
                  </div>
                </div>
                <div className="Details-section-name">by {userName}</div>
                <div className="Details-section-title">{title}</div>
                <div className="Details-section-description">{description}</div>
                { locker ?
                  <div className="Details-section-extra">
                    <div>
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    <div>{locker}</div>
                  </div>
                  : null
                }
                { restroom ?
                  <div className="Details-section-extra">
                    <div>
                      <i className="fas fa-restroom"></i>
                    </div>
                    <div>{restroom}</div>
                  </div>
                  : null
                }
                { gourmet ?
                  <div className="Details-section-extra">
                    <div>
                      <i className="fas fa-utensils"></i>
                    </div>
                    <div>{gourmet}</div>
                  </div>
                  : null
                }
              </div>
            </Fragment>
          }
        </section>
      </div>
      </Fragment>
    );
  }
}

Details.propTypes = {
  details: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  changeFavoritesData: PropTypes.func,
  getCourseDetails: PropTypes.func.isRequired
};

export default Details;
