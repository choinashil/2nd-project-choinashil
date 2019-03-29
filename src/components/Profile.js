import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import MenuContainer from '../containers/MenuContainer';
import './Profile.scss';

class Profile extends Component {
  componentDidMount() {
    const { closeMenuTab, getUserInfo } = this.props;
    const { userId } = this.props.userInfo;
    closeMenuTab();
    getUserInfo(userId);
  }

  render() {
    console.log('profile props', this.props);
    const { nickName, photoUrl } = this.props.userInfo;

    return (
      <Fragment>
        <MenuContainer />
        <div className="Profile">
          <div className="Profile-header">
            <HeaderContainer />
          </div>
          <section className="Profile-section">
            <div>
              <div>
                <img src={photoUrl} alt="user photo" />
              </div>
              <div>{nickName}</div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
