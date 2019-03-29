import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from '../config/firebaseApiKey';
import './Login.scss';

class Login extends Component {
  async _checkUserInDB() {
    try {
      const config = {
        apiKey, 
        authDomain, 
        databaseURL, 
        projectId,
        storageBucket,
        messagingSenderId
      };
  
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }

      const provider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const { user } = result;

      const facebookId = user.email;
      const userName = user.displayName.split(' ')[0];
      const photoUrl = user.photoURL;

      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/auth/check`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ facebookId })
      });
      const json = await res.json();
      const { userId } = json;

      if (userId) {
        this._signIn(facebookId, userName, userId); 
      } else {
        this._signUpAndsignIn(facebookId, userName, photoUrl);
      }

    } catch(err) {
      console.error(err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  }

  _onExitBtnClick() {
    const { closeMenuTab } = this.props;
    closeMenuTab();
  }

  async _signUpAndsignIn(facebookId, userName, photoUrl) {
    try {
      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/auth/sign-up`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          facebookId,
          userName,
          photoUrl
        })
      });
      const json = await res.json();
      const { access_token, userId } = json;

      this._GoBackToPrevPageAfterLoggedIn(access_token, userId, userName);

    } catch(err) {
      console.error(err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    } 
  }

  async _signIn(facebookId, userName, userId) {
    try {
      const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/auth/login`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          facebookId,
          userName,
          userId
        })
      });
      const json = await res.json();
      const { access_token } = json;

      this._GoBackToPrevPageAfterLoggedIn(access_token, userId, userName);

    } catch(err) {
      console.log(err);
      alert('문제가 발생했습니다. 다시 시도해주세요.');
    }
  }

  _GoBackToPrevPageAfterLoggedIn(access_token, userId, userName) {
    const { closeMenuTab, setUserInfo } = this.props;
    localStorage.setItem('access_token', access_token);
    setUserInfo(userId, userName);
    closeMenuTab();
    this.props.history.goBack();
  }

  render() {
    return (
      <Fragment>
        <div className="Login-exit">
          <Link to="/">
            <i className="fas fa-times" />
          </Link>
        </div>
        <section className="Login-section">
          <div onClick={this._checkUserInDB.bind(this)}>
            <i className="fab fa-facebook-f" />
            Login with Facebook
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Login;
