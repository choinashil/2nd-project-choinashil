import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import Indicator from './Indicator';
import './Profile.scss';

class Profile extends Component {
  componentDidMount() {
    const { getUserInfo, userId } = this.props;

    if (userId) {
      getUserInfo(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { getUserInfo, userId } = this.props;
    const initUserId = prevProps.userId;

    if(initUserId !== userId && userId) {
      getUserInfo(userId);
    }
  }

  render() {
    const { isFetching, nickName, photoUrl } = this.props;

    return (
      <Fragment>
        <MenuContainer />
        <div className="Profile">
          <div className="Profile-header">
            <HeaderContainer />
          </div>
          <section className="Profile-section">
            { isFetching ?
              <Indicator /> :
              <div className="Profile-section-user">
                <div>
                  <img src={photoUrl} alt="user" />
                </div>
                <div>{nickName}</div>
              </div>
            }
          </section>
        </div>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  nickName: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

export default Profile;
