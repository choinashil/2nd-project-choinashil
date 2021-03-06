import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Indicator from './Indicator';
import './Login.scss';

class Login extends Component {
  async _GoBackToPrevPageAfterLoggedIn(access_token, userId, userName) {
    const { closeMenuTab, setUserInfo } = this.props;
    await localStorage.setItem('access_token', access_token);
    setUserInfo(userId, userName);
    closeMenuTab();
    this.props.history.goBack();
  }

  async _login() {
    const { checkUserInDb, signIn, signUpAndSignIn } = this.props;
    const userInfo = await checkUserInDb();
    const { facebookId, userName, userId, photoUrl } = userInfo;
    let access_token;

    if (userId) {
      access_token = await signIn(facebookId, userName, userId);
    } else {
      access_token = await signUpAndSignIn(facebookId, userName, photoUrl);
    }

    const { token } = access_token;
    this._GoBackToPrevPageAfterLoggedIn(token, userId, userName);
  }

  render() {
    const { isFetching } = this.props;

    return (
      <Fragment>
      { isFetching ?
        <Indicator /> :
        <Fragment>
          <div className="Login-exit">
            <Link to="/">
              <i className="fas fa-times" />
            </Link>
          </div>
          <section className="Login-section">
            <div onClick={this._login.bind(this)}>
              <img src={require('../lib/flogo_RGB_HEX-144.png')} alt="login" />
              Login with Facebook
            </div>
          </section>
        </Fragment>
      }
      </Fragment>
    );
  }
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  checkUserInDb: PropTypes.func.isRequired,
  closeMenuTab: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signUpAndSignIn: PropTypes.func.isRequired
};

export default Login;
