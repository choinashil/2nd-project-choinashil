import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import './Menu.scss';

class Menu extends Component {
  _onHomeMenuClick() {
    const { closeMenuTab } = this.props; 
    closeMenuTab();
  }

  _onLogoutMenuClick() {
    const { setUserInfo, closeMenuTab } = this.props;
    localStorage.removeItem('access_token');
    setUserInfo(null, null);
    closeMenuTab();
  }

  _renderBlankLine() {
    return <div className="line" />;
  }

  _renderLoginTab() {
    return (
      <Link to="/sign-in">
        <div className="Menu-section-tab">Sign in</div>
      </Link>
    );
  }

  _renderPrivateTab() {
    return (
      <Fragment>
        <Link to="">
          <div className="Menu-section-tab">Profile</div>
        </Link>
        <Link to="">
          <div className="Menu-section-tab">Favorites</div>
        </Link>
        {this._renderBlankLine()}
        <div 
          className="Menu-section-tab"
          onClick={this._onLogoutMenuClick.bind(this)}
        >
          Sign out
        </div>
      </Fragment>
    );
  }

  render() {
    const { menuTabOpened } = this.props.display;
    const { userId } = this.props.userInfo;

    return (
      <div className={menuTabOpened ? "Menu go-down" : "Menu go-up"}>
        <div className="Menu-header">
          <HeaderContainer />
        </div>
        <section className="Menu-section">
          <Link to="/" onClick={this._onHomeMenuClick.bind(this)}>
            <div className="Menu-section-tab">Home</div>
          </Link>
          {this._renderBlankLine()}
          {userId ? this._renderPrivateTab() : this._renderLoginTab()}
        </section>
      </div>
    );
  }
}

export default Menu;
