import React, { Component, Fragment } from 'react';
import './CourseList.scss';

class CourseList extends Component {  
  _onListClick(courseId) {
    this.props.history.push(`/courses/${courseId}`);
  }

  _onHeartClick(courseId) {
    const { toggleLikes } = this.props; 
    const { userId } = this.props.userInfo;
    const { page } = this.props.display;

    if (userId) {
      toggleLikes(page, userId, courseId);
    } else {
      alert('즐겨찾기는 로그인 후 이용가능합니다!');
    }
  }

  _checkFavorites(likeIds) {
    const { userId } = this.props.userInfo;
    return likeIds.includes(userId) ? true : false;
  }

  render() {
    console.log('courselist render', this.props);
    const { page } = this.props.display;
    const { results } = this.props.results;
    const { favorites } = this.props.userInfo;
    
    let courseList = [];

    if (page === 'Results') {
      courseList = results;
    } else if (page === 'Favorites') {
      courseList = favorites;
    }

    console.log('courselist', courseList);
   
    return ( 
      <Fragment>
        {
          courseList.map(list => {
            const { _id, title, userName, distance, locker, restroom, gourmet, likeIds } = list;
            const thumbnail = {
              backgroundImage: 'url(https://i-h2.pinimg.com/564x/0c/90/81/0c90813e13d13883a66354bb2d60a8dd.jpg)'
            };

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
                    <div style={thumbnail} />
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
        }
      </Fragment>
    );
  }
}

export default CourseList;
