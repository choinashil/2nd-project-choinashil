import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import './Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this._onMenuClick = this._onMenuClick.bind(this);
    this._onLogoutMenuClick = this._onLogoutMenuClick.bind(this);
  }

  _onMenuClick() {
    const { closeMenuTab } = this.props; 
    closeMenuTab();
  }

  _onLogoutMenuClick() {
    const { closeMenuTab, resetUserInfo } = this.props;
    alert('로그아웃 되었습니다!');
    localStorage.removeItem('access_token');
    resetUserInfo();
    closeMenuTab();
    // this.props.history.push('/');
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
        <Link to="/new-course" onClick={this._onMenuClick}>
          <div className="Menu-section-tab">Add Course</div>
        </Link>
        {this._renderBlankLine()}
        <Link to="/profile" onClick={this._onMenuClick}>
          <div className="Menu-section-tab">Profile</div>
        </Link>
        <Link to="/favorites" onClick={this._onMenuClick}>
          <div className="Menu-section-tab">Favorites</div>
        </Link>
        {this._renderBlankLine()}
        <div 
          className="Menu-section-tab"
          onClick={this._onLogoutMenuClick}
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
          <Link to="/" onClick={this._onMenuClick}>
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
