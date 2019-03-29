import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import ResultMapContainer from '../containers/ResultMapContainer';
import './Details.scss';

class Details extends Component {
  componentDidMount() {
    console.log('details did mount');

    const { getCourseDetails } = this.props;
    const { course_id } = this.props.match.params;
    getCourseDetails(course_id);
  }

  componentDidUpdate() {
    console.log('details did update');
  }

  _onHeartClick() {
    const { changeFavoritesData } = this.props;
    const { userId } = this.props.userInfo;
    const { course_id } = this.props.match.params;

    if (userId) {
      changeFavoritesData(userId, course_id);
    } else {
      alert('즐겨찾기는 로그인 후 이용가능합니다!');
    }
  }

  _checkFavorites(likeIds) {
    const { userId } = this.props.userInfo;
    return likeIds.includes(userId) ? true : false;
  }

  render() {
    console.log('details render', this.props.results.details);
    const { course_id } = this.props.match.params;
    const { _id, title, coordinates, distance, userName, description, locker, restroom, gourmet, likeIds } = this.props.results.details;

    return ( 
      <Fragment>
      <MenuContainer />
      <div className="Details">
        <div className="Details-header">
          <HeaderContainer />
        </div>

        <section className="Details-section">
          <div className="Details-section-map">
            {_id === course_id ? <ResultMapContainer /> : null}
            <div className="Details-section-map-distance">{distance}km</div>
          </div>
          <div className="Details-section-wrapper">
            <div className="Details-section-menu">
              <div>
                <div onClick={this._onHeartClick.bind(this)}>
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
        </section>
      </div>
      </Fragment>
    );
  }
}

export default Details;
