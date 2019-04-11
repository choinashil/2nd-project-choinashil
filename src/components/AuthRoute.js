import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../actions';

export default function(ComposedComponent) {
  class AuthRoute extends Component {
    componentDidMount() {
      this._checkTokenAndGetUserInfo();
    }

    _checkTokenAndGetUserInfo() {
      const { getUserInfo } = this.props;
      const token = localStorage.getItem('access_token');
      if (token) {
        getUserInfo(token);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    getUserInfo: async token => {
      try {
        const res = await fetch(`http://running-course-app.eu-west-1.elasticbeanstalk.com/api/auth/verify`, {
          method: 'get',
          headers: {'Authorization': `Bearer ${token}`}
        });
        const json = await res.json();
        const { success, userId, userName } = json;

        if (success) {
          dispatch(setUserInfo(userId, userName));
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  return connect(
    null,
    mapDispatchToProps
  )(AuthRoute);
}
