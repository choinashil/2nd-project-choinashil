import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

class Header extends Component {
  _onMenuButtonClick() {
    const { showMenuTab } = this.props;
    showMenuTab();
  }

  render() {
    const { menuTabOpened } = this.props;

    return (
      <header className="Header">
        <div onClick={this._onMenuButtonClick.bind(this)}>
          <img src={require('../lib/logo.png')} alt="logo" className="Header-logo" />
          <i className={menuTabOpened ? "fas fa-angle-down spin-up" : "fas fa-angle-down spin-down"} />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  menuTabOpened: PropTypes.bool.isRequired,
  showMenuTab: PropTypes.func.isRequired
};

export default Header;
