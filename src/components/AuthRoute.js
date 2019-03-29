import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserInfo } from '../actions';

export default function(ComposedComponent) {
  class AuthRoute extends Component {
    componentDidMount() {
      this._checkTokenAndGetUserInfo();
    }

    componentDidUpdate() {
      this._checkTokenAndGetUserInfo();
    }

    _checkTokenAndGetUserInfo() {
      const { getUserInfo } = this.props;
      const token = localStorage.getItem('access_token');
      if (token) {
        console.log('auth route token aru');
        getUserInfo(token);
      }
    }

    render() {
      console.log('auth route');
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { userId: state.userInfo.userId };
  };

  const mapDispatchToProps = dispatch => ({
    getUserInfo: async token => {
      try {
        const ip = '192.168.0.47'; 
        const res = await fetch(`http://${ip}:5000/api/auth/verify`, {
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
    mapStateToProps,
    mapDispatchToProps
  )(AuthRoute);
}
