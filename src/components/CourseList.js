import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './CourseList.scss';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noResultMessage: ''
    };
  }

  componentDidMount() {
    const { page } = this.props;
    if (page === 'Results') {
      this.setState({ noResultMessage: '검색결과가 없습니다' });
    } else if (page === 'Favorites') {
      this.setState({ noResultMessage: '저장해둔 코스가 없습니다' });
    }
  }

  _checkFavorites(likeIds) {
    const { userId } = this.props;
    return likeIds.includes(userId) ? true : false;
  }

  _onHeartClick(courseId) {
    const { page, userId, toggleLikes } = this.props;
    if (userId) {
      toggleLikes(page, userId, courseId);
    } else {
      alert('즐겨찾기는 로그인 후 이용가능합니다!');
    }
  }

  _onListClick(courseId) {
    this.props.history.push(`/courses/${courseId}`);
  }

  render() {
    const { favorites, page, results } = this.props;
    const { noResultMessage } = this.state;

    let courseList = [];

    if (page === 'Results') {
      courseList = results;
    } else if (page === 'Favorites') {
      courseList = favorites;
    }

    return (
      <Fragment>
        { courseList.length ?
          courseList.map(list => {
            const { _id, title, userName, distance, locker, restroom, gourmet, likeIds } = list;

            return (
              <div
                key={_id}
                className="Courselist"
              >
                <div className="Courselist-wrapper">
                  <div
                    className="Courselist-img"
                    onClick={this._onListClick.bind(this, _id)}
                  >
                    <img src={require('../lib/icon.png')} alt="icon" />
                  </div>
                  <div
                    className="Courselist-description"
                    onClick={this._onListClick.bind(this, _id)}
                  >
                    <div>
                      <div>{title}</div>
                      <div>{userName}</div>
                      <div>{distance}km</div>
                      <div>
                        { locker ? <i className="fas fa-shopping-bag" /> : null }
                        { restroom ? <i className="fas fa-restroom" /> : null }
                        { gourmet ? <i className="fas fa-utensils" /> : null }
                      </div>
                    </div>
                  </div>
                  <div className="Courselist-like">
                    <div onClick={this._onHeartClick.bind(this, _id)}>
                      {this._checkFavorites(likeIds) ?
                        <i className="fas fa-heart fa-heart-filled" />
                        : <i className="far fa-heart fa-heart-blank" />
                      }
                      {page === 'Results' ? <div>{likeIds.length}</div> : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          : <div className="Courselist-no-result">
              <div>
                {noResultMessage}
              </div>
            </div>
        }
      </Fragment>
    );
  }
}

CourseList.propTypes = {
  page: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  favorites: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string.isRequired,
  toggleLikes: PropTypes.func.isRequired
};

export default CourseList;
