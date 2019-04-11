import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import MenuContainer from '../containers/MenuContainer';
import HeaderContainer from '../containers/HeaderContainer';
import './NotFound.scss';

class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <MenuContainer />
        <div className="Not-found">
          <div className="Not-found-header">
            <HeaderContainer />
          </div>
          <section className="Not-found-section">
            <div>
              <div>404</div>
              <div>Not Found</div>
            </div>
            <Link to='/'><div>Back to Home</div></Link>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default NotFound;
