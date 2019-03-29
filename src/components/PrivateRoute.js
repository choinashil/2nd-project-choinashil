import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

export default function(ComposedComponent) {
  class PrivateRoute extends Component {
    render() {
      const token = localStorage.getItem('access_token');

      console.log('private route userid', this.props.userId);
      if (!token) {
        return <Redirect to='/' />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { userId: state.userInfo.userId };
  };

  return connect(
    mapStateToProps
  )(PrivateRoute);
}
